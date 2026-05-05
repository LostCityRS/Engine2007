import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type UpdateRunEnergy from '#/network/server/model/game/UpdateRunEnergy.ts';

export default class UpdateRunEnergyEncoder extends MessageEncoder {
    opcode = 68;
    size = 1;

    write(buf: Packet, message: UpdateRunEnergy) {
        buf.p1(message.value);
    }
}
