import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpOpbj6 from "#/network/client/model/game/OpOpbj6.js";

export default class OpObj6Handler extends MessageHandler {
    handle(message: OpOpbj6, player: NetworkPlayer): boolean {
        return true;
    }
}
