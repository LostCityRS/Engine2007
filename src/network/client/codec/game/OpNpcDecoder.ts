import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpNpc from "#/network/client/model/game/OpNpc.js";

export default class OpNpcDecoder extends MessageDecoder {
    size = 2;
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
                const npcId = buf.g2_alt2();
                return new OpNpc(1, npcId);
            }
            case 2: {
                const npcId = buf.g2();
                return new OpNpc(2, npcId);
            }
            case 3: {
                const npcId = buf.g2();
                return new OpNpc(3, npcId);
            }
            case 4: {
                const npcId = buf.g2_alt1();
                return new OpNpc(4, npcId);
            }
            case 5: {
                const npcId = buf.g2();
                return new OpNpc(5, npcId);
            }
            default:
            {
                console.error(`Unhandled 'OpNpc' op value: ${this.op}`);
                process.exit(1);
            }
        }

    }
}
