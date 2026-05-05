import fs from 'fs';

import forge from 'node-forge';

import Js5 from '#/engine/Js5.ts';
import NetworkPlayer from '#/engine/NetworkPlayer.ts';
import World from '#/engine/World.ts';
import Isaac from '#/io/Isaac.ts';
import Packet from '#/io/Packet.ts';
import OpenRs2 from '#/util/OpenRs2.ts';
import type ClientSocket from '#/server/ClientSocket.ts';

class Login {
    cache = OpenRs2.RS2_500;
    revision = 500;
    privateKey: forge.pki.rsa.PrivateKey | null = null;

    decode(client: ClientSocket, data: Buffer) {
        const buf = new Packet(data);

        while (buf.available > 0) {
            const opcode = buf.g1();

            if (opcode === 14) {
                const _nameHash = buf.g1();

                const reply = Packet.alloc(9);
                reply.p1(0);
                reply.p8(0n);
                client.write(reply);
            } else if (opcode === 15) {
                const revision = buf.g4();

                if (revision !== this.revision) {
                    client.close();
                    return;
                }

                Js5.addClient(client);
            } else if (opcode === 16 || opcode === 18) {
                const len = buf.g1();
                const end = buf.pos + len;
                const rev = buf.g4();

                if (rev !== this.revision || end > buf.length) {
                    client.close();
                    return;
                }

                const lowMemory = buf.g1();

                // uid192
                buf.pos += 24;

                const settings = buf.gjstr();
                const affiliate = buf.g4();

                const crcs = [];
                for (let i = 0; i < 27; i++) {
                    if (buf.pos + 4 > end) {
                        client.close();
                        return;
                    }

                    crcs.push(buf.g4());
                }

                const seed = this.readRsaSeed(buf, end) ?? this.tryReadPlainSeed(buf, end);
                if (seed) {
                    client.inCipher = new Isaac(seed);
                    client.outCipher = new Isaac(seed.map(value => value + 50));
                } else {
                    console.warn('Login RSA seed unavailable; game packet opcodes will not match the client ISAAC stream.');
                    buf.pos = end;
                }

                // todo: process login

                const player = new NetworkPlayer(client);
                World.addPlayer(player, opcode === 18);
            } else {
                client.close();
            }
        }
    }

    private readRsaSeed(buf: Packet, end: number): number[] | null {
        const start = buf.pos;

        if (buf.pos >= end) {
            return null;
        }

        try {
            const rsa = buf.gPacket(end - buf.pos);
            rsa.rsadec(this.getPrivateKey());
            return this.tryReadPlainSeed(rsa, rsa.length);
        } catch (err) {
            buf.pos = start;
            return null;
        }
    }

    private tryReadPlainSeed(buf: Packet, end: number): number[] | null {
        const start = buf.pos;

        while (buf.pos < end && buf.data[buf.pos] === 0) {
            buf.pos++;
        }

        if (buf.pos >= end || buf.g1() !== 10) {
            buf.pos = start;
            return null;
        }

        if (buf.pos + 24 > end) {
            buf.pos = start;
            return null;
        }

        const seed = [
            buf.g4(),
            buf.g4(),
            buf.g4(),
            buf.g4()
        ];

        // Login user hash plus password follows in the plaintext RSA block.
        buf.pos += 8;
        buf.gjstr();

        return seed;
    }

    private getPrivateKey(): forge.pki.rsa.PrivateKey {
        if (this.privateKey === null) {
            const pem = fs.readFileSync('data/config/private.pem', 'ascii');
            this.privateKey = forge.pki.privateKeyFromPem(pem);
        }

        return this.privateKey;
    }
}

export default new Login();
