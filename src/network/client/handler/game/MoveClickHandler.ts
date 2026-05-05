import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import OpenRs2 from '#/util/OpenRs2.ts';
import type MoveClick from '#/network/client/model/game/MoveClick.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import RebuildNormal from '#/network/server/model/game/RebuildNormal.ts';

export default class MoveClickHandler extends MessageHandler {
    handle(message: MoveClick, player: NetworkPlayer): boolean {
        if (!message.route.length) {
            return true;
        }

        let destX = message.route[message.route.length - 1].x;
        let destZ = message.route[message.route.length - 1].z;

        const missingKeys = OpenRs2.RS2_500.getMissingKeysForRebuild(destX, destZ);
        if (missingKeys.length > 0) {
            const keyList = missingKeys.map(key => `${key.x}_${key.z}`).join(', ');
            console.warn(`Blocked movement rebuild to ${destX},${destZ}; missing XTEA keys for ${keyList}`);
            return true;
        }

        player.write(new RebuildNormal(destX, destZ));
        return true;
    }
}
