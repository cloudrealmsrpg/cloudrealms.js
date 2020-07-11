import { get, set, action, eventful } from './object/index';
import { camelize } from '../string/index';

@eventful
class RealmObject {
    /**
     * Constructor allows the object to be instantiated with properties
     *
     * @param {Object} attributes
     */
    constructor(attributes = {}) {
        if (Array.isArray(attributes)) {
            for (let index = 0; index < attributes.length; index++) {
                if (typeof attributes[index] === 'string') {
                    this[camelize(attributes[index])] = attributes[index];
                } else {
                    this[attributes[index]] = attributes[index];
                }
            }
        } else {
            const attributeKeys = Object.keys(attributes);
            for (let index = 0; index < attributeKeys.length; index++) {
                this[attributeKeys[index]] = attributes[attributeKeys[index]];
            }
        }
    }

    /**
     * Returns the value of this instances from the path
     *
     * @param {String} path
     * @return {Mixed}
     */
    get(path) {
        return get(this, path);
    }

    /**
     * Sets the value on this instance on the path
     *
     * @param {String} path
     * @param {Mixed} value
     * @return {Mixed}
     */
    set(path, value) {
        return set(this, path, value);
    }

    /**
     * Created an instance
     *
     * @param {Object} attributes
     */
    static create(attributes) {
        return new RealmObject(attributes);
    }
}

export default RealmObject;
export { get, set, action };