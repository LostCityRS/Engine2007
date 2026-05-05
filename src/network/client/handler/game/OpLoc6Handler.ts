import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpLoc6 from "#/network/client/model/game/OpLoc6.js";

export default class OpLoc6Handler extends MessageHandler {
    handle(message: OpLoc6, player: NetworkPlayer): boolean {
        return true;
    }
}
