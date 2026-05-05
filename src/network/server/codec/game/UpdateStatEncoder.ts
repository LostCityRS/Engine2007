import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type UpdateStat from '#/network/server/model/game/UpdateStat.ts';

export default class UpdateStatEncoder extends MessageEncoder {
    opcode = 204;
    size = 6;

    write(buf: Packet, message: UpdateStat) {
        buf.p1_alt2(message.id);
        buf.p1_alt1(message.level);
        buf.p4_alt3(message.experience)
    }
}
