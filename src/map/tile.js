import RealmObject from '../framework/realm-object';

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
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    }
}

export default Tile;
