import RealmObject from '../framework/object';

class Tile extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
    }

    /**
     * Renders the tile on the x/y coordinates
     *
     * @param {Integer} x the x-axis coordinate
     * @param {Integer} y the y-axis coordinate
     *
     * @void
     */
    render(x, y) {
        this.ctx.fillRect(x * this.width, y * this.height, this.width, this.height);
    }
}

export default Tile;
