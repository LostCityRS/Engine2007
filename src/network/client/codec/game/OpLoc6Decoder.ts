import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import OpLoc6 from "#/network/client/model/game/OpLoc6.js";

export default class OpLoc6Decoder extends MessageDecoder {
    opcode = 191;
    size = 2;
    limit = GameClientLimit.CLIENT;

    read(buf: Packet): ClientMessage {
        const id = buf.g2();
        return new OpLoc6(id);
    }
}
