import CloudRealms from './cloudrealms';

class Game extends CloudRealms {
    constructor(options = {}) {
        super(...arguments);
    }
}

window.Game = Game;

export default Game;
