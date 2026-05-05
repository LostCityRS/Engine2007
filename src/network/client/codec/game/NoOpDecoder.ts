import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import NoOp from '#/network/client/model/game/NoOp.ts';

export default class NoOpDecoder extends MessageDecoder {
    opcode = -1;
    size = -1;
    limit = GameClientLimit.CLIENT;

    constructor(opcode: number, size: number) {
        super();

        this.opcode = opcode;
        this.size = size;
    }

    read(buf: Packet, length: number): ClientMessage {
        return new NoOp();
    }
}
