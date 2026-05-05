import ClientMessage from '#/network/client/ClientMessage.ts';

export default class IfButton extends ClientMessage {
    op: number;
    com: number;

    constructor(op: number, com?: number) {
        super();

        this.op = typeof com === 'undefined' ? 0 : op;
        this.com = typeof com === 'undefined' ? op : com;
    }
}
