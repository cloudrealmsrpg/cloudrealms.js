import RealmObject from '../engine/object';
import UI from '../engine/ui';
import Tile from './tile';
import { range } from '../engine/array';

class Map extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
        this.width = UI.getViewportWidth() || options.width;
        this.height = UI.getViewportHeight() || options.height;
        this.ctx = options.ctx || null;
        this.spriteSrc = options.spriteSrc || null;
        this.spriteWidth = options.spriteWidth || this.width;
        this.spriteHeight = options.spriteHeight || this.height;
        this.tileMap = options.tileMap || [];
        this.tileSize = options.tileSize || this.calculateTileSize(this.spriteWidth, this.spriteHeight);
        this.setTile = options.setTile || this.setTile;
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
     * Characters added to this map
     *
     * @var {Array}
     */
    characters = [];

    /**
     * Tiles rendered by this map
     *
     * @var {Array}
     */
    tiles = [];

    /**
     * Predefined map of tile details
     *
     * @var {Array}
     */
    tileMap = [];

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
    calculateTileSize(mapWidth, mapHeight) {
        let squareWidth, squareHeight;
        const maxNumberOfTiles = this.rows * this.columns;

        const px = Math.ceil(Math.sqrt((maxNumberOfTiles * mapWidth) / mapHeight));

        if (Math.floor((px * mapHeight) / mapWidth) * px < maxNumberOfTiles) {
            squareWidth = mapHeight / Math.ceil((px * mapHeight) / mapWidth);
        } else {
            squareWidth = mapWidth / px;
        }

        const py = Math.ceil(Math.sqrt((maxNumberOfTiles * mapHeight) / mapWidth));

        if (Math.floor((py * mapWidth) / mapHeight) * py < maxNumberOfTiles) {
            squareHeight = mapWidth / Math.ceil((mapWidth * py) / mapHeight);
        } else {
            squareHeight = mapHeight / py;
        }

        return Math.max(squareWidth, squareHeight);
    }

    /**
     * Method to set tiles on the map based on tileMap
     *
     * @void
     */
    setTile(x, y, map) {
        const spriteWidth = this.spriteWidth;
        const spriteHeight = this.spriteHeight;
        let coord;
        let spriteSrc = this.spriteSrc;
        let walkeable = true;
        let spriteX = 16,
            spriteY = 16;
        if (Array.isArray(map)) {
            coord = map.find((t) => t.x === x && t.y === y);
            if (coord && coord.hasOwnProperty('spriteX') && coord.hasOwnProperty('spriteY')) {
                spriteX = coord.spriteX;
                spriteY = coord.spriteY;
            }
            if (coord && coord.hasOwnProperty('walkeable')) {
                walkeable = coord.walkeable;
            }
            if (coord && coord.hasOwnProperty('spriteSrc')) {
                spriteSrc = coord.spriteSrc;
            }
        }
        return new Tile({
            x,
            y,
            spriteX,
            spriteY,
            walkeable,
            spriteOptions: {
                src: spriteSrc,
                spriteWidth,
                spriteHeight,
            },
        });
    }

    /**
     * Adds a character to the map
     *
     * @void
     */
    addCharacter(character, x, y) {
        character.setMap(this);
        character.setPosition(x, y);
        this.characters.push(character);
        return this;
    }

    preload(stack) {
        let fullyLoaded = false;
        const canPreload = stack.every((v) => typeof v === 'object' && v.hasOwnProperty('sprite') && v.sprite.hasOwnProperty('isLoaded'));

        if (!canPreload) {
            return false;
        }

        // while (fullyLoaded === false) {
        fullyLoaded = stack.every((t) => t.sprite && t.sprite.isLoaded === true);
        // }

        // console.log(fullyLoaded);

        return fullyLoaded;
    }

    /**
     * Renders the map
     *
     * @void
     */
    render() {
        const ctx = this.ctx;
        const tileSize = this.tileSize;
        let tile;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.6);';
        for (let x = 0; x < this.matrix.length; x++) {
            const yAxis = this.matrix[x];
            for (let y = 0; y < yAxis.length; y++) {
                if (this.matrix[x][y] !== 0) {
                    // console.log(`x: ${x} y: ${y}`);
                    // use setter method to build map
                    if (this.hasOwnProperty('setTile')) {
                        tile = this.setTile(x, y, this.tileMap);
                        // console.log(tile);
                        if (tile instanceof Tile) {
                            tile.setProperties({
                                ctx,
                                size: tileSize,
                                map: this,
                            });
                        } else {
                            // throw exception must be tile instance
                        }
                        this.tiles.push(tile);
                        continue;
                    }
                }
            }
        }
        // preload spritesheets
        // this.preload(this.tiles);
        // this.preload(this.characters);
        // render tiles
        for (const i in this.tiles) {
            this.tiles[i].render();
        }
        // render characters
        setTimeout(() => {
            for (const i in this.characters) {
                this.characters[i].render();
            }
        }, 500);
        return this;
    }
}

export default Map;
