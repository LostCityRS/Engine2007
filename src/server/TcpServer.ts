import net from 'net';

import TcpSocket from '#/server/TcpSocket.ts';
import Packet from '#/io/Packet.ts';

import World from '#/engine/World.ts';
import Login from '#/engine/Login.ts';
import Js5 from '#/engine/Js5.ts';

export default class TcpServer {
    server: net.Server;

    constructor() {
        this.server = net.createServer(s => {
            s.setTimeout(30000);
            s.setNoDelay(true);

            const client = new TcpSocket(s);

            s.on('data', async data => {
                try {
                    if (client.state === 0) {
                        Login.decode(client, data);
                    } else {
                        client.buffer(data);
                    }
                } catch (err) {
                    console.error(err);
                    client.terminate();
                }
            });

            s.on('close', () => {
                client.state = -1;
            });

            s.on('end', () => {
                s.destroy();
            });

            s.on('error', () => {
                s.destroy();
            });

            s.on('timeout', () => {
                s.destroy();
            });
        });
    }

    start(port: number): Promise<void> {
        return new Promise((res) => {
            this.server.listen({
                host: '127.0.0.1',
                port: port
            }, () => {
                console.log(`Listening on port ${port}`);

                res();
            });
        });
    }
}
