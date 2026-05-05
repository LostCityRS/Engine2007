import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpNpc6 from "#/network/client/model/game/OpNpc6.js";

export default class OpNpc6Decoder extends MessageDecoder {
    opcode = 127;
    size = 2;
    limit = GameClientLimit.CLIENT;

    read(buf: Packet): ClientMessage {
        const idx = buf.g2_alt1();
        return new OpNpc6(idx);
    }
}
