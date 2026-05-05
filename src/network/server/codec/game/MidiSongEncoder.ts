import type Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type MidiSong from '#/network/server/model/game/MidiSong.ts';

export default class MidiSongEncoder extends MessageEncoder {
    opcode = 10;
    size = 2;

    write(buf: Packet, message: MidiSong) {
        buf.p2_alt1(message.id)
    }
}
