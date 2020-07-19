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
        // calculate sprite width
        this.spriteWidth = options.spriteWidth || null;
        this.spriteHeight = options.spriteHeight || null;
        // load sprite image
        this.load();
    }

    /**
     * Determine if the image to the spritesheet is loaded
     *
     * @var {Boolean} isLoaded
     */
    isLoaded = false;

    /**
     * Calcualtes default spritesheet values, useful for after the image element is loaded
     *
     */
    calculateDefaults(element = null) {
        element = element || this.element;
        const results = {
            width: element.width,
            height: element.height,
            spriteWidth: this.spriteWidth || Math.sqrt(element.width),
            spriteHeight: this.spriteHeight || Math.sqrt(element.height),
        };
        this.setProperties(results);
        return results;
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
        this.calculateDefaults(this.element);
    }
}

export default SpriteSheet;
