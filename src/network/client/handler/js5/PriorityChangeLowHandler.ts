import MessageHandler from '#/network/client/handler/MessageHandler.ts';

export default class PriorityChangeLowHandler extends MessageHandler {
    handle() {
        return true;
    }
}
