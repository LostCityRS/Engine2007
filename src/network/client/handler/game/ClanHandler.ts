import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type NoOp from '#/network/client/model/game/NoOp.ts';

export default class ClanHandler extends MessageHandler {
    handle(message: NoOp, player: NetworkPlayer): boolean {
        return true;
    }
}
