import MessageHandler from '#/network/client/handler/MessageHandler.ts';

export default class NoOpHandler extends MessageHandler {
    handle() {
        return true;
    }
}
