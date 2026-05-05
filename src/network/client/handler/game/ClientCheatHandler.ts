import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import ClientCheat from '#/network/client/model/game/ClientCheat.ts';
import IfOpenSub from '#/network/server/model/game/IfOpenSub.ts';
import RebuildNormal from '#/network/server/model/game/RebuildNormal.ts';

export default class ClientCheatHandler extends MessageHandler {
    handle(message: ClientCheat, player: NetworkPlayer): boolean {
        const [command, ...args] = message.input.toLowerCase().split(' ');

        if (command === 'openoverlay') {
            if (args.length < 1) {
                player.messageGame('usage: openoverlay (sub interface) (optional: interface, child)');
                player.messageGame('example: openoverlay 0, openoverlay 0 548 77');
                return true;
            }

            const subInterfaceId = parseInt(args[0]) & 0xFFFF;

            let interfaceId = 548;
            let child = 77;
            if (args.length > 2) {
                interfaceId = parseInt(args[0]) & 0xFFFF;
                child = parseInt(args[1]) & 0xFFFF;
            }

            player.write(new IfOpenSub((interfaceId << 16) | child, subInterfaceId, 0));
        } else if (command === 'tele') {
            if (args.length < 1) {
                player.messageGame('usage: tele (x) (z)');
                player.messageGame('example: tele 3222 3222');
                return true;
            }

            player.write(new RebuildNormal(parseInt(args[0]), parseInt(args[1])));
        }

        return true;
    }
}
