import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpPlayer from "#/network/client/model/game/OpPlayer.js";

export default class OpPlayerDecoder extends MessageDecoder {
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
                const playerId = buf.g2_alt1();
                return new OpPlayer(1, playerId);
            }
            case 2: {
                const playerId = buf.g2();
                return new OpPlayer(2, playerId);
            }
            case 3: {
                const playerId = buf.g2_alt2();
                return new OpPlayer(3, playerId);
            }
            case 4: {
                const playerId = buf.g2_alt2();
                return new OpPlayer(4, playerId);
            }
            case 5: {
                const playerId = buf.g2();
                return new OpPlayer(5, playerId);
            }
            case 6: {
                const playerId = buf.g2_alt2();
                return new OpPlayer(6, playerId);
            }
            case 7: {
                const playerId = buf.g2_alt3();
                return new OpPlayer(7, playerId);
            }
            case 8: {
                const playerId = buf.g2_alt3();
                return new OpPlayer(8, playerId);
            }
            default:
            {
                console.error(`Unhandled 'OpPlayer' op value: ${this.op}`);
                process.exit(1);
            }
        }
    }
}
