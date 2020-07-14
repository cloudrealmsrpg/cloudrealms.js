import RealmObject from './framework/object';
import UI from './framework/ui';

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
        // initialize canvas on rootElement
        this.mapManager = UI.initializeMapManager(this.rootElement);
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
