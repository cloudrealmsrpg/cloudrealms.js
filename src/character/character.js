import RealmObject, { action } from '../framework/object';

class Character extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
    }

    /**
     * Action used to move the character sprite on the map
     *
     * @param {Integer} x the x-axis coordinate
     * @param {Integer} y the y-axis coordinate
     *
     * @return {Boolean} true if the action performed successfully
     */
    @action
    move(x, y) {
        this.x = x;
        this.y = y;
        return true;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y,
        };
    }
}

export default Character;
