import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpPlayer from "#/network/client/model/game/OpPlayer.js";

export default class OpPlayerHandler extends MessageHandler {
    handle(message: OpPlayer, player: NetworkPlayer): boolean {
        return true;
    }
}
