import RealmObject from '../engine/object';
import SpriteSheet from '../engine/spritesheet';

class Tile extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
        this.ctx = options.ctx || null;
        this.x = options.x || this.x;
        this.y = options.y || this.y;
        this.size = options.size || this.size;
        this.spriteX = options.spriteX || this.spriteX;
        this.spriteY = options.spriteY || this.spriteY;
        this.sprite = new SpriteSheet(options.spriteOptions || {});
        this.walkeable = options.walkeable;
    }

    /**
     * Gets the sprite sheet for this tile
     *
     * @return {SpriteSheet}
     */
    getSpriteSheet() {
        return this.get('sprite');
    }

    /**
     * Determines if this tile is walkeable, meaning a character, npc or monster can walk on
     *
     * @var {Boolean} walkeable can be walked on or not
     */
    walkeable = true;

    /**
     * The default tile size
     *
     * @var {Integer} height the tile side height
     */
    size = 16;

    /**
     * The default x-axis position of this tile
     *
     * @var {Integer} x the y-axis coordinate
     */
    x = 0;

    /**
     * The default y-axis position of this tile
     *
     * @var {Integer} y the y-axis coordinate
     */
    y = 0;

    /**
     * Renders the tile on the x/y coordinates
     *
     * @param {Integer} x the x-axis coordinate
     * @param {Integer} y the y-axis coordinate
     *
     * @void
     */
    render(x = null, y = null) {
        x = x || this.x;
        y = y || this.y;
        // if no sprite reject
        if (!this.sprite) {
            // exception
            return false;
        }
        // this.ctx.fillRect(x * this.width, y * this.height, this.width, this.height);
        const size = this.size;
        const destinationX = x * size;
        const destinationY = y * size;
        const spriteX = this.spriteX;
        const spriteY = this.spriteY;
        const spriteLoaded = this.sprite.isLoaded === true;
        const { element } = this.sprite;
        // if sprite is loaded just draw
        if (spriteLoaded) {
            // const { spriteWidth, spriteHeight } = this.sprite.calculateDefaults(element);
            // update tile size for map to use spriteWidth/spriteHeight
            // console.log(
            //     'tile',
            //     element,
            //     `spriteX: ${spriteX}`,
            //     `spriteY: ${spriteY}`,
            //     // `spriteWidth: ${spriteWidth}`,
            //     // `spriteHeight: ${spriteHeight}`,
            //     `destinationX: ${destinationX}`,
            //     `destinationY: ${destinationY}`
            // );
            this.ctx.drawImage(element, spriteX, spriteY, size, size, destinationX, destinationY, size, size);
        } else {
            element.onload = ({ target }) => {
                // console.log(
                //     'tile',
                //     element,
                //     `spriteX: ${spriteX}`,
                //     `spriteY: ${spriteY}`,
                //     // `spriteWidth: ${spriteWidth}`,
                //     // `spriteHeight: ${spriteHeight}`,
                //     `destinationX: ${destinationX}`,
                //     `destinationY: ${destinationY}`
                // );
                this.ctx.drawImage(element, spriteX, spriteY, size, size, destinationX, destinationY, size, size);
            };
        }
        return this;
    }
}

export default Tile;
