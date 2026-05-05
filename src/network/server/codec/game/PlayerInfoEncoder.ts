import Packet from '#/io/Packet.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';
import type PlayerInfo from '#/network/server/model/game/PlayerInfo.ts';

export default class PlayerInfoEncoder extends MessageEncoder {
    opcode = 116;
    size = -2;

    write(buf: Packet, _message: PlayerInfo) {
        // local
        buf.bits();
        buf.pBit(1, 0); // has info
        // buf.pBit(2, 3); // tele
        // buf.pBit(2, 0); // level
        // buf.pBit(7, 54);
        // buf.pBit(1, 1); // has extended info
        // buf.pBit(7, 54);
        // buf.pBit(1, 1); // telejump

        // old vis
        buf.pBit(8, 0);

        // new vis
        buf.pBit(11, 2047);
        buf.bytes();

        // extended info
        const info = 0;

        if (info > 0) {
            buf.p1(info);
            if ((info & 0x40) !== 0) {
                buf.p1(info << 8);
            }

            if ((info & 0x2) !== 0) {
                const appearance = Packet.alloc(100);
                appearance.p1(0); // gender
                appearance.p1(-1); // pk headicon
                appearance.p1(-1); // prayer headicon

                // for (let i = 0; i < 12; i++) {
                //     appearance.p1(0);
                // }
                appearance.p1(0);
                appearance.p1(0);
                appearance.p1(0);
                appearance.p1(0);
                appearance.p2(274);
                appearance.p1(0);
                appearance.p2(282);
                appearance.p2(292);
                appearance.p2(256);
                appearance.p2(289);
                appearance.p2(298);
                appearance.p2(266);

                for (let i = 0; i < 5; i++) {
                    appearance.p1(0);
                }

                appearance.p2(-1); // readyanim
                appearance.p2(-1); // turn-on-spot anim
                appearance.p2(-1); // walkanim
                appearance.p2(-1); // walkanim_b
                appearance.p2(-1); // walkanim_l
                appearance.p2(-1); // walkanim_r
                appearance.p2(-1); // runanim
                appearance.pjstr('test'); // display name
                appearance.p1(3); // combat level
                appearance.p2(1); // total level

                buf.p1_alt3(appearance.pos);
                buf.pdata_alt1(appearance.data, 0, appearance.pos);
                appearance.release();
            }
        }
    }

    test(_: PlayerInfo): number {
        return 500; // todo
    }
}
