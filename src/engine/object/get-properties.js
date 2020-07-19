import get from './get';

export default function getProperties(object, properties = []) {
    const selected = {};
    let propertyNames = arguments;
    let i = 1;

    if (arguments.length === 2 && Array.isArray(properties)) {
        i = 0;
        propertyNames = arguments[1];
    }

    for (; i < propertyNames.length; i++) {
        selected[propertyNames[i]] = get(object, propertyNames[i]);
    }

    return selected;
}
