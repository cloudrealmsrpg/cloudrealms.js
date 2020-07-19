import set from './set';

export default function setProperties(object, properties = {}) {
    for (const property in properties) {
        // if (properties[property] && typeof properties[property] === 'object' && properties[property] !== undefined && !Array.isArray(object)) {
        // setProperties(properties[property], properties[property]);
        // } else {
        set(object, property, properties[property]);
        // }
    }
    return object;
}
