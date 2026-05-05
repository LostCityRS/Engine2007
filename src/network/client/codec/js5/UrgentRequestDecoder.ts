import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import UrgentRequest from '#/network/client/model/js5/UrgentRequest.ts';

export default class UrgentRequestDecoder extends MessageDecoder {
    opcode = 1;
    size = 3;

    read(buf: Packet): ClientMessage {
        const archive = buf.g1();
        const group = buf.g2();

        return new UrgentRequest(archive, group);
    }
}
