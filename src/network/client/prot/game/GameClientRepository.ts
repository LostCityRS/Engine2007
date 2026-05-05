import ClientRepository from '#/network/client/prot/ClientRepository.ts';
import ClientCheatDecoder from '#/network/client/codec/game/ClientCheatDecoder.ts';

import MoveClickDecoder from '#/network/client/codec/game/MoveClickDecoder.ts';
import NoOpDecoder from '#/network/client/codec/game/NoOpDecoder.ts';
import ClientCheatHandler from '#/network/client/handler/game/ClientCheatHandler.ts';
import MoveClickHandler from '#/network/client/handler/game/MoveClickHandler.ts';
import NoOpHandler from '#/network/client/handler/game/NoOpHandler.ts';
import ClanDecoder from '#/network/client/codec/game/ClanDecoder.ts';
import IfButtonDecoder from '#/network/client/codec/game/IfButtonDecoder.ts';
import ClanHandler from '#/network/client/handler/game/ClanHandler.ts';
import IfButtonHandler from '#/network/client/handler/game/IfButtonHandler.ts';
import OpPlayerDecoder from '#/network/client/codec/game/OpPlayerDecoder.ts';
import OpPlayerHandler from '#/network/client/handler/game/OpPlayerHandler.ts';
import OpNpcDecoder from '#/network/client/codec/game/OpNpcDecoder.ts';
import OpNpcHandler from '#/network/client/handler/game/OpNpcHandler.ts';
import OpLocDecoder from '#/network/client/codec/game/OpLocDecoder.ts';
import OpLocHandler from '#/network/client/handler/game/OpLocHandler.ts';
import OpObjDecoder from '#/network/client/codec/game/OpObjDecoder.ts';
import OpObjHandler from '#/network/client/handler/game/OpObjHandler.ts';
import OpLoc6Decoder from '#/network/client/codec/game/OpLoc6Decoder.ts';
import OpLoc6Handler from '#/network/client/handler/game/OpLoc6Handler.ts';
import OpNpc6Decoder from '#/network/client/codec/game/OpNpc6Decoder.ts';
import OpNpc6Handler from '#/network/client/handler/game/OpNpc6Handler.ts';
import OpObj6Decoder from '#/network/client/codec/game/OpObj6Decoder.ts';
import OpObj6Handler from '#/network/client/handler/game/OpObj6Handler.ts';

export default class GameClientRepository extends ClientRepository {
    constructor() {
        super();

        this.bind(new MoveClickDecoder(200), new MoveClickHandler()); // MOVE_GAMECLICK
        this.bind(new MoveClickDecoder(199), new MoveClickHandler()); // MOVE_MINIMAPCLICK
        this.bind(new MoveClickDecoder(159), new MoveClickHandler()); // MOVE_OPCLICK

        this.bind(new NoOpDecoder(19, 0), new NoOpHandler()); // NO_TIMEOUT
        this.bind(new NoOpDecoder(24, 0), new NoOpHandler()); // IF_CLOSE
        this.bind(new NoOpDecoder(63, 4), new NoOpHandler()); // EVENT_MOUSE_CLICK
        this.bind(new NoOpDecoder(111, -1), new NoOpHandler()); // EVENT_MOUSE_MOVE
        this.bind(new NoOpDecoder(130, 1), new NoOpHandler()); // EVENT_APPLET_FOCUS
        this.bind(new NoOpDecoder(133, 4), new NoOpHandler()); // MIDI_SONG_END
        this.bind(new NoOpDecoder(173, 4), new NoOpHandler()); // EVENT_CAMERA_POSITION
        this.bind(new NoOpDecoder(198, 4), new NoOpHandler()); // WINDOW_STATUS
        this.bind(new NoOpDecoder(207, 9), new NoOpHandler()); // INV_BUTTOND
        this.bind(new NoOpDecoder(213, 0), new NoOpHandler()); // MAP_BUILD_COMPLETE
        this.bind(new NoOpDecoder(226, 0), new NoOpHandler()); // IDLE_TIMER
        this.bind(new NoOpDecoder(135, 12), new NoOpHandler()); // IF_BUTTOND

        this.bind(new ClientCheatDecoder(), new ClientCheatHandler())
        this.bind(new ClanDecoder(), new ClanHandler())

        this.bind(new IfButtonDecoder(1, 44), new IfButtonHandler())
        this.bind(new IfButtonDecoder(2, 50), new IfButtonHandler())
        this.bind(new IfButtonDecoder(3, 103), new IfButtonHandler())
        this.bind(new IfButtonDecoder(4, 64), new IfButtonHandler())
        this.bind(new IfButtonDecoder(5, 178), new IfButtonHandler())
        this.bind(new IfButtonDecoder(6, 81), new IfButtonHandler())
        this.bind(new IfButtonDecoder(7, 236), new IfButtonHandler())
        this.bind(new IfButtonDecoder(8, 188), new IfButtonHandler())
        this.bind(new IfButtonDecoder(9, 128), new IfButtonHandler())
        this.bind(new IfButtonDecoder(10, 254), new IfButtonHandler())

        this.bind(new OpPlayerDecoder(1, 65), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(2, 151), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(3, 118), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(4, 214), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(5, 114), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(6, 161), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(7, 47), new OpPlayerHandler())
        this.bind(new OpPlayerDecoder(8, 204), new OpPlayerHandler())

        this.bind(new OpNpcDecoder(1, 78), new OpNpcHandler())
        this.bind(new OpNpcDecoder(2, 71), new OpNpcHandler())
        this.bind(new OpNpcDecoder(3, 164), new OpNpcHandler())
        this.bind(new OpNpcDecoder(4, 33), new OpNpcHandler())
        this.bind(new OpNpcDecoder(5, 195), new OpNpcHandler())
        this.bind(new OpNpc6Decoder(), new OpNpc6Handler())

        this.bind(new OpLocDecoder(1, 53), new OpLocHandler())
        this.bind(new OpLocDecoder(2, 13), new OpLocHandler())
        this.bind(new OpLocDecoder(3, 94), new OpLocHandler())
        this.bind(new OpLocDecoder(4, 97), new OpLocHandler())
        this.bind(new OpLocDecoder(5, 169), new OpLocHandler())
        this.bind(new OpLocDecoder(6, 211), new OpLocHandler())
        this.bind(new OpLocDecoder(7, 39), new OpLocHandler())
        this.bind(new OpLoc6Decoder(), new OpLoc6Handler())

        this.bind(new OpObjDecoder(1, 216), new OpObjHandler())
        this.bind(new OpObjDecoder(2, 150), new OpObjHandler())
        this.bind(new OpObjDecoder(3, 205), new OpObjHandler())
        this.bind(new OpObjDecoder(4, 26), new OpObjHandler())
        this.bind(new OpObjDecoder(5, 32), new OpObjHandler())
        this.bind(new OpObj6Decoder(), new OpObj6Handler())
    }
}
