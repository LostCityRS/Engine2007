import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type MidiJingle from '#/network/server/model/game/MidiJingle.ts';

export default class MidiJingleEncoder extends MessageEncoder {
    opcode = 89;
    size = 5;

    write(buf: Packet, message: MidiJingle) {
        buf.p2_alt3(message.id)

        //the following 3 bytes are read but not used so empty-fill the buffer (should be g3_alt2)
        buf.p1(0)
        buf.p1(0)
        buf.p1(0)
    }
}
