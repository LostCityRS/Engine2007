import ServerRepository from '#/network/server/prot/ServerRepository.ts';

import GameMessage from '#/network/server/model/game/MessageGame.ts';
import GameMessageEncoder from '#/network/server/codec/game/MessageGameEncoder.ts';
import IfOpenTop from '#/network/server/model/game/IfOpenTop.ts';
import IfOpenTopEncoder from '#/network/server/codec/game/IfOpenTopEncoder.ts';
import Logout from '#/network/server/model/game/Logout.ts';
import LogoutEncoder from '#/network/server/codec/game/LogoutEncoder.ts';
import MidiJingle from '#/network/server/model/game/MidiJingle.ts';
import MidiJingleEncoder from '#/network/server/codec/game/MidiJingleEncoder.ts';
import MidiSong from '#/network/server/model/game/MidiSong.ts';
import MidiSongEncoder from '#/network/server/codec/game/MidiSongEncoder.ts';
import RebuildNormal from '#/network/server/model/game/RebuildNormal.ts';
import RebuildNormalEncoder from '#/network/server/codec/game/RebuildNormalEncoder.ts';
import PrivateMessage from '#/network/server/model/game/PrivateMessage.ts';
import PrivateMessageEncoder from '#/network/server/codec/game/PrivateMessageEncoder.ts';
import PlayerInfo from '#/network/server/model/game/PlayerInfo.ts';
import PlayerInfoEncoder from '#/network/server/codec/game/PlayerInfoEncoder.ts';
import IfOpenSub from '#/network/server/model/game/IfOpenSub.ts';
import IfOpenSubEncoder from '#/network/server/codec/game/IfOpenSubEncoder.ts';
import UpdateRunEnergy from '#/network/server/model/game/UpdateRunEnergy.ts';
import UpdateRunEnergyEncoder from '#/network/server/codec/game/UpdateRunEnergyEncoder.ts';
import ChatFilterSettings from '#/network/server/model/game/ChatFilterSettings.ts';
import ChatFilterSettingsEncoder from '#/network/server/codec/game/ChatFilterSettingsEncoder.ts';
import UpdateRunWeight from '#/network/server/model/game/UpdateRunWeight.ts';
import UpdateRunWeightEncoder from '#/network/server/codec/game/UpdateRunWeightEncoder.ts';
import SynthSound from '#/network/server/model/game/SynthSound.ts';
import SynthSoundEncoder from '#/network/server/codec/game/SynthSoundEncoder.ts';
import UpdateStat from '#/network/server/model/game/UpdateStat.ts';
import UpdateStatEncoder from '#/network/server/codec/game/UpdateStatEncoder.ts';

export default class GameServerRepository extends ServerRepository {
    constructor() {
        super();

        this.bind(GameMessage, new GameMessageEncoder());
        this.bind(IfOpenTop, new IfOpenTopEncoder());
        this.bind(Logout, new LogoutEncoder());
        this.bind(MidiJingle, new MidiJingleEncoder());
        this.bind(MidiSong, new MidiSongEncoder());
        this.bind(PrivateMessage, new PrivateMessageEncoder());
        this.bind(RebuildNormal, new RebuildNormalEncoder());
        this.bind(PlayerInfo, new PlayerInfoEncoder());
        this.bind(IfOpenSub, new IfOpenSubEncoder());
        this.bind(UpdateRunEnergy, new UpdateRunEnergyEncoder());
        this.bind(ChatFilterSettings, new ChatFilterSettingsEncoder());
        this.bind(UpdateRunWeight, new UpdateRunWeightEncoder());
        this.bind(UpdateStat, new UpdateStatEncoder());
        this.bind(SynthSound, new SynthSoundEncoder());
    }
}
