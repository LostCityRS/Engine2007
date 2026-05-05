import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpObj from "#/network/client/model/game/OpObj.js";

export default class OpObjDecoder extends MessageDecoder {
    size = 8;
    limit = GameClientLimit.CLIENT;
    op: number;
    opcode: number;

    constructor(op: number, opcode: number) {
        super();
        this.op = op;
        this.opcode = opcode;
    }

    read(buf: Packet): ClientMessage {
        switch (this.op) {
            case 1: {
                const com = buf.g4_alt3();
                const parent = buf.g2_alt1();
                const id = buf.g2_alt3();
                return new OpObj(1, com, parent, id);
            }
            case 2: {
                const com = buf.g4_alt3();
                const parent = buf.g2_alt3();
                const id = buf.g2();
                return new OpObj(2, com, parent, id);
            }
            case 3: {
                const id = buf.g2_alt1();
                const parent = buf.g2_alt2();
                const com = buf.g4_alt3();
                return new OpObj(3, com, parent, id);
            }
            case 4: {
                const parent = buf.g2();
                const id = buf.g2();
                const com = buf.g4();
                return new OpObj(4, com, parent, id);
            }
            case 5: {
                const com = buf.g4();
                const id = buf.g2_alt3();
                const parent = buf.g2_alt3();
                return new OpObj(5, com, parent, id);
            }
            default:
            {
                console.error(`Unhandled 'OpObj' op value: ${this.op}`);
                process.exit(1);
            }
        }

    }
}
