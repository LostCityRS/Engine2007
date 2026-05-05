import Js5 from '#/engine/Js5.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type PrefetchRequest from '#/network/client/model/js5/PrefetchRequest.ts';
import type ClientSocket from '#/server/ClientSocket.ts';

export default class UrgentRequestHandler extends MessageHandler {
    handle(message: PrefetchRequest, client: ClientSocket) {
        if (client.urgentLimit >= 20) {
            return true;
        }

        const { archive, group } = message;

        Js5.urgent.push({ client, archive, group });
        client.urgentLimit++;
        return true;
    }
}
