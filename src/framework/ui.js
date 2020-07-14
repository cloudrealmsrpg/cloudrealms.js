import MapManager from '../map/manager';
import { setProperties } from './object/index';

class UI {
    static initializeMapManager(rootElement) {
        const canvas = this.createElement('canvas', {
            id: 'cloudrealms',
            style: {
                width: '100vw',
                height: '100vh',
            },
        });
        const ctx = canvas.getContext('2d');
        const root = this.getElement(rootElement);
        root.appendChild(canvas);
        this.rootElement = root;
        return new MapManager(canvas, ctx);
    }

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
