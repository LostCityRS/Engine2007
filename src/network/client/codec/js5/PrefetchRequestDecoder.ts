import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import PrefetchRequest from '#/network/client/model/js5/PrefetchRequest.ts';

export default class PrefetchRequestDecoder extends MessageDecoder {
    opcode = 0;
    size = 3;

    read(buf: Packet): ClientMessage {
        const archive = buf.g1();
        const group = buf.g2();

        return new PrefetchRequest(archive, group);
    }
}
