import Packet from '#/io/Packet.ts';
import OpenRs2 from '#/util/OpenRs2.ts';
import Js5ClientRepository from '#/network/client/prot/js5/Js5ClientRepository.ts';
import Js5ServerRepository from '#/network/server/prot/Js5ServerRepository.ts';
import Js5GroupResponse from '#/network/server/model/js5/Js5GroupResponse.ts';
import type ClientSocket from '#/server/ClientSocket.ts';

type Js5Request = {
    client: ClientSocket;
    archive: number;
    group: number;
}

class Js5 {
    static cache = OpenRs2.RS2_500;

    static serverRepo = new Js5ServerRepository();
    static clientRepo = new Js5ClientRepository();

    static in = Packet.alloc(4);

    clients: ClientSocket[] = [];
    urgent: Js5Request[] = [];
    prefetch: Js5Request[] = [];

    async load() {
        await Js5.cache.predownload();

        this.cycle();
    }

    async cycle() {
        for (let i = 0; i < this.clients.length; i++) {
            const client = this.clients[i];
            if (client.state === -1) {
                this.clients.splice(i--, 1);
                continue;
            }

            let available = client.available;
            while (available > 0) {
                if (client.packetType === -1) {
                    client.read(Js5.in.data, 0, 1);
                    Js5.in.pos = 0;
                    client.packetType = Js5.in.g1();
                    available -= 1;

                    const decoder = Js5.clientRepo.getDecoder(client.packetType);
                    if (!decoder) {
                        break;
                    }

                    client.packetSize = decoder.size;
                }

                if (available < client.packetSize) {
                    break;
                }

                const decoder = Js5.clientRepo.getDecoder(client.packetType)!;
                const handler = Js5.clientRepo.getHandler(client.packetType)!;

                client.read(Js5.in.data, 0, client.packetSize);
                Js5.in.pos = 0;
                available -= client.packetSize;

                const message = decoder.read(Js5.in, decoder.size);
                client.packetType = -1;

                if (!handler.handle(message, client)) {
                    break;
                }
            }
        }

        for (let i = 0; i < this.urgent.length; i++) {
            const req = this.urgent.splice(i--, 1)[0];
            if (req.client.state === -1) {
                continue;
            }

            req.client.urgentLimit--;

            const data = await Js5.cache.getGroup(req.archive, req.group);
            if (!data) {
                continue;
            }

            const message = new Js5GroupResponse(req.archive, req.group, false, data, 0);
            const encoder = Js5.serverRepo.getEncoder(message);
            if (!encoder) {
                continue;
            }

            const buf = Packet.alloc(10_000_000);
            encoder.write(buf, message);
            req.client.write(buf);
            buf.release();
        }

        for (let i = 0; i < this.prefetch.length; i++) {
            const req = this.prefetch.splice(i--, 1)[0];
            if (req.client.state === -1) {
                continue;
            }

            req.client.prefetchLimit--;

            const data = await Js5.cache.getGroup(req.archive, req.group);
            if (!data) {
                continue;
            }

            const message = new Js5GroupResponse(req.archive, req.group, true, data, 0);
            const encoder = Js5.serverRepo.getEncoder(message);
            if (!encoder) {
                continue;
            }

            const buf = Packet.alloc(10_000_000);
            encoder.write(buf, message);
            req.client.write(buf);
            buf.release();
        }

        // todo: account for drift due to event loop/OS scheduling
        setTimeout(this.cycle.bind(this), 50);
    }

    addClient(client: ClientSocket) {
        const reply = Packet.alloc(1);
        reply.p1(0);
        client.write(reply);
        client.state = 2;

        this.clients.push(client);
    }
}

export default new Js5();
