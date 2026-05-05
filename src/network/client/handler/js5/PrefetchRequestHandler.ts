import Js5 from '#/engine/Js5.ts';
import MessageHandler from '#/network/client/handler/MessageHandler.ts';
import type PrefetchRequest from '#/network/client/model/js5/PrefetchRequest.ts';
import type ClientSocket from '#/server/ClientSocket.ts';

export default class PrefetchRequestHandler extends MessageHandler {
    handle(message: PrefetchRequest, client: ClientSocket) {
        if (client.prefetchLimit >= 20) {
            return true;
        }

        const { archive, group } = message;

        Js5.prefetch.push({ client, archive, group });
        client.prefetchLimit++;
        return true;
    }
}
