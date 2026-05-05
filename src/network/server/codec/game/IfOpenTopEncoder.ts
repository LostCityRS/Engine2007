import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type IfOpenTop from '#/network/server/model/game/IfOpenTop.ts';

export default class IfOpenTopEncoder extends MessageEncoder {
    opcode = 86;
    size = 3;

    write(buf: Packet, message: IfOpenTop) {
        buf.p1(0);
        buf.p2_alt3(message.interfaceId);
    }
}
