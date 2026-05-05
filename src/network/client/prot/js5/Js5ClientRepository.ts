import ClientRepository from '#/network/client/prot/ClientRepository.ts';

import PrefetchRequestDecoder from '#/network/client/codec/js5/PrefetchRequestDecoder.ts';
import PriorityChangeHighDecoder from '#/network/client/codec/js5/PriorityChangeHighDecoder.ts';
import PriorityChangeLowDecoder from '#/network/client/codec/js5/PriorityChangeLowDecoder.ts';
import UrgentRequestDecoder from '#/network/client/codec/js5/UrgentRequestDecoder.ts';
import XorChangeDecoder from '#/network/client/codec/js5/XorChangeDecoder.ts';
import PrefetchRequestHandler from '#/network/client/handler/js5/PrefetchRequestHandler.ts';
import PriorityChangeHighHandler from '#/network/client/handler/js5/PriorityChangeHighHandler.ts';
import PriorityChangeLowHandler from '#/network/client/handler/js5/PriorityChangeLowHandler.ts';
import UrgentRequestHandler from '#/network/client/handler/js5/UrgentRequestHandler.ts';
import XorChangeHandler from '#/network/client/handler/js5/XorChangeHandler.ts';

export default class Js5ClientRepository extends ClientRepository {
    constructor() {
        super();

        this.bind(new PrefetchRequestDecoder(), new PrefetchRequestHandler());
        this.bind(new UrgentRequestDecoder(), new UrgentRequestHandler());
        this.bind(new PriorityChangeHighDecoder(), new PriorityChangeHighHandler());
        this.bind(new PriorityChangeLowDecoder(), new PriorityChangeLowHandler());
        this.bind(new XorChangeDecoder(), new XorChangeHandler());
    }
}
