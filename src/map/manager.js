import Map from './map';
import { setProperties, getProperties } from '../framework/object';
import { uuid } from '../framework/utils/uuid';

class MapManager {
    maps = [];

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    addMap(map = null) {
        const { canvas, ctx } = getProperties(this, 'ctx', 'canvas');

        if (!map) {
            map = new Map({
                canvas,
                ctx,
            });
        }

        map = setProperties(map, {
            id: uuid(),
            show: true,
        });

        if (this.getMap(map.id) !== false) {
            return false;
        }

        this.maps.push(map);
        return this;
    }

    getMap(id) {
        const length = this.maps.length;
        for (let i = 0; i < length; i++) {
            if (this.maps[i].id === id) {
                return this.maps[i];
            }
        }
        return false;
    }

    removeMap(id) {
        const length = this.maps.length;
        for (let i = 0; i < length; i++) {
            if (this.maps[i].id === id) {
                const removed = this.layers[i];
                this.maps.splice(i, 1);
                return removed;
            }
        }
        return false;
    }

    render() {
        this.maps.forEach(function (map) {
            if (map.show) {
                map.render();
            }
        });
    }
}

export default MapManager;
