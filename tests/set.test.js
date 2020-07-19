import { assert } from 'chai';
import set from '../src/engine/object/set';

describe('set', () => {
    it('should set the value at the path of an array, and return the value set', () => {
        const array = ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'];
        // replace orange with bannana
        const bannana = set(array, 1, 'Bannana');
        assert.equal(array[1], `Bannana`);
        assert.equal(bannana, `Bannana`);
    });
    it('should set the value at the path of an object, and return the value set', () => {
        const shop = {
            name: 'Fruit Shop',
            items: ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'],
        };
        // change the name of the fruit shop
        const newShopName = set(shop, 'name', `Ron's Fruit Shop`);
        assert.equal(newShopName, `Ron's Fruit Shop`);
        assert.equal(shop.name, `Ron's Fruit Shop`);
    });
    it('should set the value at the nested path of an object, and return the value set', () => {
        const shop = {
            name: 'Fruit Shop',
            items: [
                { name: 'Apple', price: 240 },
                { name: 'Orange', price: 300 },
                { name: 'Melon', price: 500 },
            ],
        };
        // change the price of the apple
        const newApplePrice = set(shop, 'items.0.price', 100);
        assert.equal(newApplePrice, 100);
        assert.equal(shop.items[0].price, 100);
    });
});
