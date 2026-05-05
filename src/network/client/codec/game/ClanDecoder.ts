import type Packet from '#/io/Packet.ts';

import ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import NoOp from '#/network/client/model/game/NoOp.ts';

export default class ClanDecoder extends MessageDecoder {
    opcode = 58;
    size = -1;
    limit = GameClientLimit.CLIENT;

    read(buf: Packet): ClientMessage {
        const input = buf.gjstr();

        //input will be 0 length only when clicking leave button
        if (input.length > 0) {
            //todo: handle Join Chat
        } else {
            //todo: handle Leave Chat
        }
        return new NoOp()
    }
}
