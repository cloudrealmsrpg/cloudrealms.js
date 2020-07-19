import RealmObject, { action } from '../engine/object';
import SpriteSheet from '../engine/spritesheet';

class Character extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
        this.x = options.x || this.x;
        this.y = options.y || this.y;
        this.map = options.map || this.map;
        this.ctx = options.ctx || this.ctx;
        this.playeable = options.playeable || false;
        this.player = options.player || false;
        this.spriteX = options.spriteX || this.spriteX;
        this.spriteY = options.spriteY || this.spriteY;
        this.width = options.width || this.width;
        this.height = options.height || this.height;
        this.sprite = new SpriteSheet(options.spriteOptions || {});
        this.walkeable = options.walkeable;
        // if player initiate controls for this character
        if (this.player) {
            this.watchForMovement();
        }
    }

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
     * The default sprite x-axis starting position
     *
     * @var {Integer} x the y-axis sprite position
     */
    spriteX = 0;

    /**
     * The default sprite y-axis starting position
     *
     * @var {Integer} y the y-axis sprite position
     */
    spriteY = 0;

    /**
     * Sets the current map for this character
     *
     * @param {Map} map
     * @return {Character}
     */
    setMap(map) {
        this.setProperties({ currentMap: map, ctx: map.ctx });
        return this;
    }

    /**
     * Sets the character position coordinates
     *
     * @param {Integer} x
     * @param {Integer} y
     * @return {Character}
     */
    setPosition(x, y) {
        this.set('x', x);
        this.set('y', y);
        return this;
    }

    /**
     * Sets the current canvas context for this character
     *
     * @param {CanvasRenderingContext2D} ctx
     * @return {Character}
     */
    setContext(ctx) {
        this.set('ctx', ctx);
        return this;
    }

    watchForMovement() {
        document.addEventListener('keydown', (event) => {
            const { keyCode } = event;
            switch (keyCode) {
                // move player up
                case 38:
                    this.moveUp();
                    break;
                // move player down
                case 40:
                    this.moveDown();
                    break;
                // move player left
                case 37:
                    this.moveLeft();
                    break;
                // move player right
                case 39:
                    this.moveRight();
                    break;
                // user has pressed enter key
                case 13:
                    // const target = this.player.checkSurroundings(this.destination);
                    // if (target && !target.isTalking) {
                    //     target.startDialog();
                    // }
                    break;
            }
        });
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

    render(x = null, y = null) {
        x = x || this.x;
        y = y || this.y;
        // if no sprite reject
        if (!this.sprite) {
            // exception
            return false;
        }
        // define default rendendering variables
        const tileSize = this.currentMap.tileSize;
        const destinationX = x * tileSize;
        const destinationY = y * tileSize;
        const spriteX = this.spriteX || this.sprite.spriteX || 0;
        const spriteY = this.spriteY || this.sprite.spriteY || 0;
        const isLoaded = this.sprite.isLoaded;
        const { element } = this.sprite;
        // check if sprite image has already loaded
        if (isLoaded) {
            const { spriteWidth, spriteHeight } = this.sprite.calculateDefaults(element);
            // console.log('character', element, spriteX, spriteY, spriteWidth, spriteHeight, destinationX, destinationY, spriteWidth, spriteHeight);
            this.ctx.drawImage(element, spriteX, spriteY, spriteWidth, spriteHeight, destinationX, destinationY, tileSize, tileSize);
        } else {
            element.onload = ({ target }) => {
                const { spriteWidth, spriteHeight } = this.sprite.calculateDefaults(target);
                // console.log('character', element, spriteX, spriteY, spriteWidth, spriteHeight, destinationX, destinationY, spriteWidth, spriteHeight);
                this.ctx.drawImage(element, spriteX, spriteY, spriteWidth, spriteHeight, destinationX, destinationY, tileSize, tileSize);
            };
        }
        return this;
    }
}

export default Character;
