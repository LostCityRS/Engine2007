import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type UpdateRunWeight from '#/network/server/model/game/UpdateRunWeight.ts';

export default class UpdateRunWeightEncoder extends MessageEncoder {
    opcode = 54;
    size = 2;

    write(buf: Packet, message: UpdateRunWeight) {
        buf.p2(message.value);
    }
}
