import set from './set';

export default function setProperties(object, properties = {}) {
    for (const property in properties) {
        if (properties[property] && typeof properties[property] === 'object' && !Array.isArray(object)) {
            setProperties(object[property], properties[property]);
        } else {
            set(object, property, properties[property]);
        }
    }
    return object;
}
