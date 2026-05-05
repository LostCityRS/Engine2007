import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpOpbj6 from "#/network/client/model/game/OpOpbj6.js";

export default class OpObj6Decoder extends MessageDecoder {
    opcode = 166;
    size = 2;
    limit = GameClientLimit.CLIENT;

    read(buf: Packet): ClientMessage {
        const idx = buf.g2_alt2();
        return new OpOpbj6(idx);
    }
}
