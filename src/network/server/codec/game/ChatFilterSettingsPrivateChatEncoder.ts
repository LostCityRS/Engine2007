import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type ChatFilterSettingsPrivateChat from '#/network/server/model/game/ChatFilterSettingsPrivateChat.ts';

export default class ChatFilterSettingsPrivateChatEncoder extends MessageEncoder {
    opcode = 70;
    size = 1;

    write(buf: Packet, message: ChatFilterSettingsPrivateChat) {
        buf.p1(message.value);
    }
}
