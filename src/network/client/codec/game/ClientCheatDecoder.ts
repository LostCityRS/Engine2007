import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import ClientCheat from '#/network/client/model/game/ClientCheat.ts';

export default class ClientCheatDecoder extends MessageDecoder {
    opcode = 175;
    size = -1;
    limit = GameClientLimit.CLIENT;

    read(buf: Packet): ClientMessage {
        const input = buf.gjstr();

        return new ClientCheat(input);
    }
}
