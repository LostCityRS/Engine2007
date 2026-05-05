import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';
import type IfOpenSub from '#/network/server/model/game/IfOpenSub.ts';

export default class IfOpenSubEncoder extends MessageEncoder {
    opcode = 25;
    size = 7;

    write(buf: Packet, message: IfOpenSub) {
        buf.p4(message.interfaceId);
        buf.p2(message.subInterfaceId);
        buf.p1(message.type);
    }
}
