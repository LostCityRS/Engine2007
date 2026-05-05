import type Packet from '#/io/Packet.ts';
import OpenRs2 from '#/util/OpenRs2.ts';

import MessageEncoder from '#/network/server/codec/MessageEncoder.ts';

import type RebuildNormal from '#/network/server/model/game/RebuildNormal.ts';

export default class RebuildNormalEncoder extends MessageEncoder {
    opcode = 79;
    size = -2;

    write(buf: Packet, message: RebuildNormal) {
        const x = message.absX;
        const z = message.absZ;

        const zx = x >> 3;
        const zz = z >> 3;

        // todo: better key provider
        for (let mx = (zx - 6) >> 3; mx <= (zx + 6) >> 3; mx++) {
            for (let mz = (zz - 6) >> 3; mz <= (zz + 6) >> 3; mz++) {
                const key = OpenRs2.RS2_500.getKey(mx, mz);
                for (let i = 0; i < 4; i++) {
                    buf.p4_alt1(key[i]);
                }
            }
        }

        buf.p2_alt2(zz);
        // todo: helper class to get local coord
        buf.p2_alt3(x - ((zx - 6) << 3));
        buf.p2(zx);
        buf.p1_alt3(0); // todo
        buf.p2(z - ((zz - 6) << 3));
    }

    test(message: RebuildNormal): number {
        const x = message.absX;
        const z = message.absZ;

        const zx = x >> 3;
        const zz = z >> 3;

        let maps = 0;
        for (let mx = (zx - 6) >> 3; mx <= (zx + 6) >> 3; mx++) {
            for (let mz = (zz - 6) >> 3; mz <= (zz + 6) >> 3; mz++) {
                for (let i = 0; i < 4; i++) {
                    maps++;
                }
            }
        }

        return (maps * 16) + 2 + 2 + 2 + 1 + 2;
    }
}
