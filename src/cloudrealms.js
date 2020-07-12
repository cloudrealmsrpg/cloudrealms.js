import Engine from './engine';
import RealmObject from './framework/realm-object';

class CloudRealms extends RealmObject.extend(Engine) {
    constructor(options = {}) {
        super(...arguments);
    }
}

window.CloudRealms = CloudRealms;

export default CloudRealms;
