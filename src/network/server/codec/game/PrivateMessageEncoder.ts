import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type PrivateMessage from '#/network/server/model/game/PrivateMessage.ts';

export default class PrivateMessageEncoder extends MessageEncoder {
    opcode = 6;
    size = -2;

    write(buf: Packet, message: PrivateMessage) {
        buf.pjstr(message.senderName)
        buf.p2(message.senderId)
        buf.p3(message.messageId)
        buf.p1(message.senderRights)
        //todo: psmart(len)
        //todo: huffman encoded message.message
    }
}
