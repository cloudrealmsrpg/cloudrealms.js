import RealmObject from '../engine/object';

class Magic extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
    }

    /**
     * The magic name
     *
     * @var {String}
     */
    name;

    /**
     * The cast action
     */
    cast() {
        // do something
    }
}

export default Magic;
