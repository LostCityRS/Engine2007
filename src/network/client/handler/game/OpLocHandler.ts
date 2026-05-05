import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpLoc from "#/network/client/model/game/OpLoc.js";

export default class OpLocHandler extends MessageHandler {
    handle(message: OpLoc, player: NetworkPlayer): boolean {
        return true;
    }
}
