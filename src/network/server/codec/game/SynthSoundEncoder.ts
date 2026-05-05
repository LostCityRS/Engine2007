import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';
import type SynthSound from '#/network/server/model/game/SynthSound.ts';

export default class SynthSoundEncoder extends MessageEncoder {
    opcode = 113;
    size = 5;

    write(buf: Packet, message: SynthSound) {
        buf.p2(message.id);
        buf.p1(message.loops ? 1 : 0);
        buf.p2(message.delay)
    }
}
