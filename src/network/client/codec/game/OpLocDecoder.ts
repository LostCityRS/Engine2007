import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpLoc from "#/network/client/model/game/OpLoc.js";

export default class OpLocDecoder extends MessageDecoder {
    size = 6;
    limit = GameClientLimit.CLIENT;
    op: number;
    opcode: number;

    constructor(op: number, opcode: number) {
        super();
        this.op = op;
        this.opcode = opcode
    }

    read(buf: Packet): ClientMessage {
        switch (this.op) {
            case 1: {
                const locId = buf.g2();
                const z = buf.g2_alt3();
                const x = buf.g2_alt3();
                return new OpLoc(1, locId, x, z);
            }
            case 2: {
                const locId = buf.g2_alt3();
                const x = buf.g2_alt1();
                const z = buf.g2_alt1();
                return new OpLoc(2, locId, x, z);
            }
            case 3: {
                const x = buf.g2_alt2();
                const z = buf.g2();
                const locId = buf.g2_alt3();
                return new OpLoc(3, locId, x, z);
            }
            case 4: {
                const z = buf.g2_alt3();
                const locId = buf.g2_alt3();
                const x = buf.g2_alt1();
                return new OpLoc(4, locId, x, z);
            }
            case 5: {
                const z = buf.g2();
                const locId = buf.g2_alt3();
                const x = buf.g2_alt3();
                return new OpLoc(5, locId, x, z);
            }
            case 6: {
                const x = buf.g2_alt3();
                const z = buf.g2_alt1();
                const locId = buf.g2_alt3();
                return new OpLoc(6, locId, x, z);
            }
            case 7: {
                const z = buf.g2_alt2();
                const locId = buf.g2_alt3();
                const x = buf.g2_alt1();
                return new OpLoc(7, locId, x, z);
            }
            default:
            {
                console.error(`Unhandled 'OpLoc' op value: ${this.op}`);
                process.exit(1);
            }
        }
    }
}
