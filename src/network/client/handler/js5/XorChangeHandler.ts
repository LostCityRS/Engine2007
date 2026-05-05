import MessageHandler from '#/network/client/handler/MessageHandler.ts';

export default class XorChangeHandler extends MessageHandler {
    handle() {
        return true;
    }
}
