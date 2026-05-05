import MessageHandler from '#/network/client/handler/MessageHandler.ts';

export default class PriorityChangeHighHandler extends MessageHandler {
    handle() {
        return true;
    }
}
