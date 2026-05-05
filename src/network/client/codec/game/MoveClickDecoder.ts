import type Packet from '#/io/Packet.ts';

import type ClientMessage from '#/network/client/ClientMessage.ts';
import GameClientLimit from '#/network/client/codec/game/GameClientLimit.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';

import MoveClick from '#/network/client/model/game/MoveClick.ts';

export default class MoveClickDecoder extends MessageDecoder {
    opcode = -1;
    size = -1;
    limit = GameClientLimit.USER;

    constructor(opcode: number) {
        super();

        this.opcode = opcode;
    }

    read(buf: Packet, length: number): ClientMessage {
        const offset = this.opcode === 199 ? 14 : 0; // extra input data when clicking minimap
        const waypoints = (length - 3 - offset) / 2;

        const startZ = buf.g2();
        const ctrlHeld = buf.g1_alt2();

        const path = [];
        for (let i = 1; i < waypoints; i++) {
            const x = buf.g1b_alt3();
            const z = buf.g1b_alt2();

            path.push({ x, z });
        }

        const startX = buf.g2_alt2();

        if (path.length === 0) {
            path.push({ x: startX, z: startZ });
        } else {
            for (let i = 0; i < path.length; i++) {
                path[i].x += startX;
                path[i].z += startZ;
            }
        }

        return new MoveClick(path, ctrlHeld == 1);
    }
}
