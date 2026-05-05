import ServerRepository from '#/network/server/prot/ServerRepository.ts';

import Js5GroupResponse from '#/network/server/model/js5/Js5GroupResponse.ts';
import Js5GroupResponseEncoder from '#/network/server/codec/js5/Js5GroupResponseEncoder.ts';

export default class Js5ServerRepository extends ServerRepository {
    constructor() {
        super();

        this.bind(Js5GroupResponse, new Js5GroupResponseEncoder());
    }
}
