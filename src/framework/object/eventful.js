function eventful(target) {
    const listeners = {};

    target.prototype.on = (eventType, callback) => {
        const id = Symbol('id');
        if (!listeners[eventType]) {
            listeners[eventType] = {};
        }

        // register event callback
        listeners[eventType][id] = callback;

        return {
            unsubscribe: function unsubscribe() {
                delete listeners[eventType][id];
                if (Object.getOwnPropertySymbols(listeners[eventType]).length === 0) {
                    delete listeners[eventType];
                }
            },
        };
    };

    target.prototype.dispatchEvent = (event, ...args) => {
        if (!listeners[event.type]) return;

        Object.getOwnPropertySymbols(listeners[event.type]).forEach((key) => {
            return listeners[event.type][key](event, ...args);
        });
    };

    target.listeners = listeners;

    // return target;
}

export default eventful;
