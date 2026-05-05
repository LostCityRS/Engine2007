import GameServerMessage from '#/network/server/GameServerMessage.ts';

import GameServerPriority from '#/network/server/prot/game/GameServerPriority.ts';

export default class ChatFilterSettings extends GameServerMessage {
    priority = GameServerPriority.BUFFERED;

    // 0: Public
    // 1: Friends
    // 2: Off
    // 3: Hide
    
    // Note: In the client, you have to move mouse over the 
    // stones before they visually update after sending this packet
    constructor(
        readonly publicChatFilter: number,
        readonly privateChatFilter: number,
        readonly tradeChatFilter: number
    ) {
        super();
    }
}
