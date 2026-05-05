import path from 'path';

import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import fastifyAutoload from '@fastify/autoload';

import ejs from 'ejs';

const fastify = Fastify({
    // logger: true
});

fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),

    setHeaders: (res, path, stat) => {
        if (path.endsWith('.ws')) {
            res.setHeader('content-type', 'text/html');
        }
    }
});

fastify.register(fastifyView, {
    root: path.join(process.cwd(), 'view'),

    engine: {
        ejs
    }
});

fastify.register(fastifyAutoload, {
    dir: path.join(process.cwd(), 'src/web/routes')
});

export async function startWeb() {
    await fastify.listen({
        host: '127.0.0.1',
        port: 7001
    });
}
