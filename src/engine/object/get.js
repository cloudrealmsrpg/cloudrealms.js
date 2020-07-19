/**
 * Returns the value of an objects given path, returns null if path isn't found
 *
 * @param {Mixed} object
 * @param {String} path
 */
const getResolved = (func, path) => {
    const resolved = func();
    return Array.isArray(resolved) || typeof resolved === 'object' ? get(resolved, path) : null;
};

export default function get(object, path) {
    let current = object;

    const type = typeof object;
    const isObject = type === 'object';
    const isFunction = type === 'function';
    const isArray = Array.isArray(object);

    const pathType = typeof path;
    const pathIsString = pathType === 'string';
    const pathIsDotted = pathIsString && path.includes('.');
    const pathArray = pathIsDotted ? path.split('.') : [path];

    if (isArray || isObject) {
        for (let i = 0; i < pathArray.length; i++) {
            if (current[pathArray[i]] === undefined) {
                return null;
            } else {
                current = current[pathArray[i]];

                // resolve functions and continue
                if (typeof current === 'function') {
                    const newPath = pathArray.slice(i + 1).join('.');
                    return getResolved(current, newPath);
                }
            }
        }
        return current;
    }

    if (isFunction) {
        return getResolved(object, path);
    }
}
