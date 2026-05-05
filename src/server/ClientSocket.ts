import type NetworkPlayer from '#/engine/NetworkPlayer.ts';
import type Isaac from '#/io/Isaac.ts';
import type Packet from '#/io/Packet.ts';

export default abstract class ClientSocket {
    state: number = 0;

    player: NetworkPlayer | null = null;

    inBuffer: Uint8Array = new Uint8Array(65536); // todo: 65kb on each client adds some mem pressure and node doesn't store the socket buffer for us :(
    inBufferPos = 0;

    // todo: generic enough to keep here, but maybe still move to other classes
    packetType: number = -1;
    packetSize: number = 0;
    inCipher: Isaac | null = null;
    outCipher: Isaac | null = null;

    // todo: move to other classes
    userLimit: number = 0;
    clientLimit: number = 0;

    // todo: move to other classes
    prefetchLimit: number = 0;
    urgentLimit: number = 0;

    abstract write(src: Uint8Array | Packet): void;

    abstract buffer(data: Buffer): void;
    abstract get available(): number;
    abstract read(dest: Uint8Array, offset: number, length: number): void;

    abstract close(): void;
    abstract terminate(): void;
}
