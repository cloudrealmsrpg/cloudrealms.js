import Engine from './engine';
import Game from './game';

class CloudRealms extends Engine {
    constructor(options = {}) {
        super(...arguments);
    }

    static newGame(options = {}) {
        return new Game(options);
    }
}

window.CloudRealms = CloudRealms;

export default CloudRealms;
