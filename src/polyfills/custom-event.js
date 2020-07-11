function CustomEvent(event, params) {
    if (window.CustomEvent === 'function') {
        return window.CustomEvent(...arguments);
    }

    function CustomEventPolyfill(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    window.CustomEvent = CustomEventPolyfill;

    return window.CustomEvent(...arguments);
}

export default CustomEvent;
