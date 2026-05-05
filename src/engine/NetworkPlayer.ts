import Packet from '#/io/Packet.ts';

import Player from '#/engine/Player.ts';

import type ClientSocket from '#/server/ClientSocket.ts';

import GameServerRepository from '#/network/server/prot/GameServerRepository.ts';
import GameClientRepository from '#/network/client/prot/game/GameClientRepository.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import GameMessageDecoder from '#/network/client/codec/game/GameMessageDecoder.ts';
import type GameServerMessage from '#/network/server/GameServerMessage.ts';
import GameServerPriority from '#/network/server/prot/game/GameServerPriority.ts';
import MessageGame from '#/network/server/model/game/MessageGame.ts';

export default class NetworkPlayer extends Player {
    static serverRepo = new GameServerRepository();
    static clientRepo = new GameClientRepository();

    static in = Packet.alloc(5000); // shared input buffer because processing is synchronous

    client: ClientSocket;
    buffer: GameServerMessage[] = [];
    bufferSize = 0;

    constructor(client: ClientSocket) {
        super();

        this.client = client;
        this.client.player = this;
    }

    read() {
        let available = this.client.available;
        if (available < 1) {
            return false;
        }

        if (this.client.packetType === -1) {
            this.client.read(NetworkPlayer.in.data, 0, 1);
            available -= 1;

            NetworkPlayer.in.pos = 0;
            this.client.packetType = (NetworkPlayer.in.g1() - (this.client.inCipher?.nextByte() ?? 0)) & 0xFF;

            const decoder = NetworkPlayer.clientRepo.getDecoder(this.client.packetType);
            if (typeof decoder === 'undefined') {
                console.log('Unhandled packet type', this.client.packetType);
                this.client.inBufferPos = 0;
                this.client.packetType = -1;
                return false;
            }

            this.client.packetSize = decoder.size;
        }

        if (this.client.packetSize === -1) {
            if (available < 1) {
                return false;
            }

            this.client.read(NetworkPlayer.in.data, 0, 1);
            available -= 1;

            NetworkPlayer.in.pos = 0;
            this.client.packetSize = NetworkPlayer.in.g1();
        } else if (this.client.packetSize === -2) {
            if (available < 2) {
                return false;
            }

            this.client.read(NetworkPlayer.in.data, 0, 2);
            available -= 2;

            NetworkPlayer.in.pos = 0;
            this.client.packetSize = NetworkPlayer.in.g2();
        }

        if (available < this.client.packetSize) {
            return false;
        }

        this.client.read(NetworkPlayer.in.data, 0, this.client.packetSize);
        available -= this.client.packetSize;

        // we know these exist if we got this far
        const decoder = NetworkPlayer.clientRepo.getDecoder(this.client.packetType)! as GameMessageDecoder;
        const handler = NetworkPlayer.clientRepo.getHandler(this.client.packetType)!;

        NetworkPlayer.in.pos = 0;
        const message = decoder.read(NetworkPlayer.in, this.client.packetSize);

        if (decoder.limit === GameClientLimit.USER) {
            this.client.userLimit++;
        } else if (decoder.limit === GameClientLimit.CLIENT) {
            this.client.clientLimit++;
        }

        this.client.packetType = -1;
        return handler.handle(message, this);
    }

    write(message: GameServerMessage, force = false) {
        if (!this.client) {
            return;
        }

        const encoder = NetworkPlayer.serverRepo.getEncoder(message);
        if (typeof encoder === 'undefined') {
            throw new Error(`Missing ${message.constructor.name} message encoder`);
        }

        const realSize = encoder.test(message);

        let required = 1 + realSize; // opcode + real size
        if (encoder.size === -1) {
            required += 1; // psize1
        } else if (encoder.size === -2) {
            required += 2; // psize2
        }

        if (force || message.priority === GameServerPriority.IMMEDIATE) {
            const buf = Packet.alloc(30000);
            if (buf.length < realSize) {
                throw new Error(`Cannot write ${message.constructor.name} message`);
            }

            buf.p1((encoder.opcode + (this.client.outCipher?.nextByte() ?? 0)) & 0xFF);
            if (encoder.size === -1) {
                buf.p1(0);
            } else if (encoder.size === -2) {
                buf.p2(0);
            }
            const start = buf.pos;

            encoder.write(buf, message);

            if (encoder.size === -1) {
                buf.psize1(buf.pos - start);
            } else if (encoder.size === -2) {
                buf.psize2(buf.pos - start);
            }

            this.client.write(buf);
            buf.release();
        } else if (message.priority === GameServerPriority.BUFFERED) {
            if (required + this.bufferSize > 5000) {
                throw new Error('Buffer full');
            }

            this.buffer.push(message);
            this.bufferSize += required;
        }
    }

    messageGame(message: string) {
        this.write(new MessageGame(message));
    }
}
