import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type OpObj from "#/network/client/model/game/OpObj.js";

export default class OpObjHandler extends MessageHandler {
    handle(message: OpObj, player: NetworkPlayer): boolean {
        return true;
    }
}
