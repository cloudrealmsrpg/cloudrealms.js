import { setProperties } from './object/index';

class UI {
    static getViewportWidth() {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }

    static getViewportHeight() {
        return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    }

    static getElement(selector) {
        if (typeof selector === 'string') {
            return document.querySelector(selector);
        }
        return selector;
    }

    static createElement(tagName = 'div', properties = {}) {
        const element = setProperties(document.createElement(tagName), properties);
        return element;
    }
}

export default UI;
