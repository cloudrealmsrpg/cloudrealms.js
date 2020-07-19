import { assert } from 'chai';
import setProperties from '../src/engine/object/set-properties';

describe('setProperties', () => {
    it('should mass set properties to an object', () => {
        const shop = {
            name: 'Fruit Shop',
            items: ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'],
        };
        // change the name and add an address field to shop
        const updatedShop = setProperties(shop, {
            name: `Mandy's Fruit Shop`,
            address: '123 Beach St, Singapore',
        });
        assert.equal(shop.name, `Mandy's Fruit Shop`);
        assert.equal(updatedShop, shop);
    });
    it('should mass set properties to an empty object', () => {
        const shop = {};
        // change the name of the fruit shop
        const updatedShop = setProperties(shop, { name: `Ron's Fruit Shop` });
        assert.equal(shop.name, `Ron's Fruit Shop`);
        assert.equal(updatedShop, shop);
    });
    it('should replace a property of an object', () => {
        const shop = {
            name: 'Fruit Shop',
            items: [
                { name: 'Apple', price: 240 },
                { name: 'Orange', price: 300 },
                { name: 'Melon', price: 500 },
            ],
            employees: [
                { name: 'Mandy', shift: 'morning' },
                { name: 'Randy', shift: 'afternoon' },
                { name: 'Sandy', shift: 'evening' },
            ],
        };
        // change the price of the apple
        const updatedShop = setProperties(shop, {
            employees: null,
        });
        assert.equal(shop.employees, null);
        assert.equal(shop, updatedShop);
    });
    it('should set deep properties on object', () => {
        const shop = {
            name: 'Fruit Shop',
            items: [
                { name: 'Apple', price: 240 },
                { name: 'Orange', price: 300 },
                { name: 'Melon', price: 500 },
            ],
            employees: [
                { name: 'Mandy', shift: 'morning' },
                { name: 'Randy', shift: 'afternoon' },
                { name: 'Sandy', shift: 'evening' },
            ],
        };
        // change the price of the apple
        const updatedShop = setProperties(shop.employees, {
            3: { name: 'Ron', shift: 'evening' },
        });
        assert.equal(shop.employees[3].name, 'Ron');
        assert.equal(shop.employees, updatedShop);
    });
});
