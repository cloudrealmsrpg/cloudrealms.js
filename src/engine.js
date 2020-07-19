import RealmObject from './engine/object';
import MapManager from './map/manager';
import UI from './engine/ui';

class Engine extends RealmObject {
    /**
     * The root DOM element of the Application. This can be specified as an
     * DOM element or selector string. This is the element that will be passed to the Games's
     * `eventDispatcher`, which sets up the listeners for event delegation. Every
     * view in your game should be a child of the element you specify here.
     *
     * @var {String} rootElement
     */
    rootElement = 'body';

    constructor(options = {}) {
        super(...arguments);
        // set rootElement
        this.rootElement = options.rootElement || this.rootElement;
        // initialize canvas on rootElement
        this.mapManager = this.initializeMapManager(this.rootElement);
    }

    /**
     * Initializes a CloudRealms MapManager instance, to manage map layers
     *
     * @param {Mixed} rootElement DOM Element or DOM selector fo the root element
     */
    initializeMapManager(rootElement = null) {
        const canvas = UI.createElement('canvas', {
            id: 'cloudrealms',
            style: {
                width: '100vw',
                height: '100vh',
            },
        });
        const ctx = canvas.getContext('2d');
        const root = UI.getElement(rootElement || this.rootElement);
        root.appendChild(canvas);
        this.rootElement = root;
        return new MapManager(canvas, ctx);
    }

    /**
     * Run the game
     *
     * @void
     */
    run() {
        this.mapManager.render();
    }

    eventDispatcher = null;

    customEvents = null;

    autoboot = null;

    init() {}

    reset() {}

    didBecomeReady() {}

    willDestroy() {}

    buildRegistry() {}

    commonSetupRegistry(registry) {}
}

export default Engine;
