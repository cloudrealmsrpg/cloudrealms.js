/* eslint-disable no-undef */
import RealmObject from './object';

class SpriteSheet extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
        // set spritesheet source
        this.src = options.src || null;
        // set dimensions of spritesheet
        this.width = options.width || null;
        this.height = options.height || null;
        // set sprite sheet vertical frames
        this.verticalFrames = options.verticalFrames || this.calculateVerticalFrames();
        this.horizontalFrames = options.horizontalFrames || this.calculateHorizontalFrames();
        // calculate sprite width
        this.spriteWidth = options.spriteWidth || this.calculateSpriteWidth();
        this.spriteHeight = options.spriteHeight || this.calculateSpriteHeight();
        // set the current frame
        this.currentHorizontalFrame = options.currentHorizontalFrame || 0;
        this.currentVerticalFrame = options.currentVerticalFrame || 0;
        // load sprite image
        this.load();
    }

    /**
     * Determine if the image to the spritesheet is loaded
     *
     * @var {Boolean} isLoaded
     */
    isLoaded = false;

    calculateVerticalFrames() {
        return Math.sqrt(this.height);
    }

    calculateHorizontalFrames() {
        return Math.sqrt(this.width);
    }

    calculateSpriteWidth() {
        return this.width / this.horizontalFrames;
    }

    calculateSpriteHeight() {
        return this.height / this.verticalFrames;
    }

    autoAdjust(element = null) {
        // todo recaulcate default variables based on element actual height and width
    }

    /**
     * Loads the spritesheet image
     */
    load() {
        this.element = new Image();
        this.element.onload = () => {
            this.isLoaded = true;
        };
        this.element.src = this.src;
    }
}

export default SpriteSheet;
