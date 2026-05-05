import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpNpc6 from "#/network/client/model/game/OpNpc6.js";

export default class OpNpc6Handler extends MessageHandler {
    handle(message: OpNpc6, player: NetworkPlayer): boolean {
        return true;
    }
}
