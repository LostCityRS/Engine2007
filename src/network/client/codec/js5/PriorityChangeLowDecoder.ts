import type ClientMessage from '#/network/client/ClientMessage.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import PriorityChangeLow from '#/network/client/model/js5/PriorityChangeLow.ts';

export default class PriorityChangeLowDecoder extends MessageDecoder {
    opcode = 3;
    size = 3;

    read(): ClientMessage {
        return new PriorityChangeLow();
    }
}
