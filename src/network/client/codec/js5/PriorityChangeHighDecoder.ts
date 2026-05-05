import type ClientMessage from '#/network/client/ClientMessage.ts';
import MessageDecoder from '#/network/client/codec/MessageDecoder.ts';
import PriorityChangeHigh from '#/network/client/model/js5/PriorityChangeHigh.ts';

export default class PriorityChangeHighDecoder extends MessageDecoder {
    opcode = 2;
    size = 3;

    read(): ClientMessage {
        return new PriorityChangeHigh();
    }
}
