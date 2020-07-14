import get from './object/get';
import set from './object/set';
import setProperties from './object/set-properties';
import getProperties from './object/get-properties';
import eventful from './object/eventful';
import action from './object/action';
import camelize from '../string/camelize';

@eventful
class RealmObject {
    /**
     * Constructor allows the object to be instantiated with properties
     *
     * @param {Object} attributes
     * @void
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
        this.autoRender();
    }

    /**
     * Renders the object if renderable, and returns true if it has rendered or should render
     *
     * @return {Boolean} if the object has been "auto rendered"
     */
    autoRender() {
        // RealmObject can render()
        if (this.hasOwnProperty('render') && this.hasOwnProperty('renderOnCreation') && this.renderOnCreation === true) {
            this.render();
            return true;
        }
        return false;
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
     * @param {Mixed} valuu
     * @return {Mixed}
     */
    set(path, value) {
        return set(this, path, value);
    }

    /**
     * Mass set properties to this instance
     *
     * @param {Object} properties
     * @return {Object}
     */
    setProperties(properties = {}) {
        return setProperties(this, properties);
    }

    /**
     * Return multiple properties for this instance
     *
     * @param {Object} properties
     * @return {Object}
     */
    getProperties(properties = []) {
        if (arguments.length === 1 && Array.isArray(properties)) {
            properties = arguments[1];
        }
        return getProperties(this, properties);
    }

    /**
     * Created an instance
     *
     * @param {Object} attributes
     */
    static create(attributes) {
        return new RealmObject(attributes);
    }

    /**
     * Allows RealmObject to be extended by other classes
     *
     * @param {Array} classes
     * @return {Object} this
     */
    static extend(classes = []) {
        if (arguments.length > 1) {
            classes = arguments;
        }
        for (let index = 0; index < classes.length; index++) {
            for (const property in classes[index]) {
                if (Object.prototype.hasOwnProperty.call(classes[index], property)) {
                    this[property] = classes[index][property];
                }
            }
        }
        return this;
    }

    /**
     * Allows RealmObject to inject other instances as properties
     *
     * @param {Array} classes
     * @return {Object} this
     */
    static inject(classes = []) {
        if (arguments.length > 1) {
            classes = arguments;
        }
        // for (const Injected in classes) {
        //     this[camelize(Injected.constructor.name)] = new Injected();
        // }
        return this;
    }
}

export default RealmObject;
export { set, get, getProperties, setProperties, action };
