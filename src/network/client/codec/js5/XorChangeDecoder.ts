import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import XorChange from '#/network/client/model/js5/XorChange.ts';

export default class XorChangeDecoder extends MessageDecoder {
    opcode = 4;
    size = 3;

    read(buf: Packet): ClientMessage {
        const key = buf.g1();

        return new XorChange(key);
    }
}
