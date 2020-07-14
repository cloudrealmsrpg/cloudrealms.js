import RealmObject from '../framework/object';
import UI from '../framework/ui';
import Tile from './tile';
import { range } from '../framework/array';

class Map extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
        this.width = UI.getViewportWidth() || options.width;
        this.height = UI.getViewportHeight() || options.height;
    }

    /**
     * The number of rows to render on the map matrix
     *
     * @var {Integer}
     */
    rows = 25;

    /**
     * The number of columns to render on the map matrix
     *
     * @var {Integer}
     */
    columns = 25;

    /**
     * Tiles rendered by this map
     *
     * @var {Array}
     */
    tiles = [];

    /**
     * Generates a matrix for the map
     *
     * @var {Array}
     */
    get matrix() {
        const matrix = [];
        range(this.rows).forEach((x) => {
            matrix[x] = [];
            range(this.columns).forEach((y) => {
                matrix[x][y] = 1;
            });
        });
        return matrix;
    }

    /**
     * Calculates the default tile sizes for this map
     *
     * @var {Object}
     */
    get defaultTileSize() {
        return {
            width: this.width / this.columns,
            height: this.height / this.rows,
        };
    }

    /**
     * Renders the map
     *
     * @void
     */
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.6);';
        for (let x = 0; x < this.matrix.length; x++) {
            const yAxis = this.matrix[x];
            for (let y = 0; y < yAxis.length; y++) {
                if (this.matrix[x][y] !== 0) {
                    const { width, height } = this.defaultTileSize;
                    const tile = new Tile({
                        ctx: this.ctx,
                        width,
                        height,
                        x,
                        y,
                        renderOnCreation: true,
                    });
                    this.tiles.push(tile);
                }
            }
        }
    }
}

export default Map;
