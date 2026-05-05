import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type IfButton from "#/network/client/model/game/IfButton.js";
import Logout from "#/network/server/model/game/Logout.js";

export default class IfButtonHandler extends MessageHandler {
    handle(message: IfButton, player: NetworkPlayer): boolean {
        //todo: runescript
        if (message.com === 11927558) {
            player.write(new Logout())
            return true;
        }
        return true;
    }
}
