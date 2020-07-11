import RealmObject from '../framework/realm-object';

class Skill extends RealmObject {
    constructor(options = {}) {
        super(...arguments);
    }

    /**
     * The perform action
     */
    perform() {
        // do something
    }
}

export default Skill;
