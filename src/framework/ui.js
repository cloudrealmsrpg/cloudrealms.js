import { setProperties } from './object';

class UI {
    static init(rootElement) {
        const canvas = this.createElement('canvas', { id: 'cloudrealms' });
        const ctx2d = canvas.getContext('2d');
        return {
            canvas,
            ctx2d,
        };
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
