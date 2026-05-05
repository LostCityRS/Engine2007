import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpNpc from "#/network/client/model/game/OpNpc.js";

export default class OpNpcHandler extends MessageHandler {
    handle(message: OpNpc, player: NetworkPlayer): boolean {
        return true;
    }
}
