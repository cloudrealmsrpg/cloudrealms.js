/* eslint-disable no-unused-expressions */
import { assert, expect } from 'chai';
import RealmObject from '../src/framework/object';

describe('RealmObject', () => {
    describe('#get', () => {
        it('should return the value at the path of an array', () => {
            const realmObject = new RealmObject({
                fruits: ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'],
            });
            assert.equal(realmObject.get('fruits.1'), `Orange`);
            assert.equal(realmObject.get('fruits.4'), `Grape`);
        });
        it('should return the value at the path of an object', () => {
            const realmObject = new RealmObject({
                type: 'Person',
                name: 'Ron',
                skills: ['Coding', 'Gaming', 'Business'],
                friends: [{ name: 'Evan' }, { name: 'Shiv' }],
            });
            assert.equal(realmObject.get('friends.1.name'), `Shiv`);
            assert.equal(realmObject.get('name'), `Ron`);
            assert.equal(realmObject.get('skills.1'), `Gaming`);
        });
        it('should return the value at the path of a function that returns object or array', () => {
            const realmObject = new RealmObject({
                getCar: () => {
                    return {
                        type: 'Car',
                        name: 'Honda',
                        model: 'Accord',
                        year: '1999',
                    };
                },
                getMessage: () => ['Hello', ' ', 'World'],
                getDeep: () => [
                    {
                        type: 'building',
                        name: 'Waffle House',
                        has: [{ name: 'waffles' }, { name: 'pancakes' }, { name: 'grits', with: [{ name: 'cheese' }] }],
                    },
                ],
            });
            assert.equal(realmObject.get('getCar.name'), `Honda`);
            assert.equal(realmObject.get('getMessage.2'), `World`);
            assert.equal(realmObject.get('getDeep.0.has.2.with.0.name'), `cheese`);
        });
    });
    describe('#set', () => {
        const shop = new RealmObject({
            name: 'Fruit Shop',
            items: [
                { name: 'Apple', price: 240 },
                { name: 'Orange', price: 300 },
                { name: 'Melon', price: 500 },
            ],
            fruits: ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'],
        });
        it('should set the value at the path of an array, and return the value set', () => {
            const bannana = shop.set('fruits.1', 'Bannana');
            assert.equal(shop.fruits[1], `Bannana`);
            assert.equal(bannana, `Bannana`);
        });
        it('should set the value at the path of an object, and return the value set', () => {
            // change the name of the fruit shop
            const newShopName = shop.set('name', `Ron's Fruit Shop`);
            assert.equal(newShopName, `Ron's Fruit Shop`);
            assert.equal(shop.name, `Ron's Fruit Shop`);
        });
        it('should set the value at the nested path of an object, and return the value set', () => {
            // change the price of the apple
            const newApplePrice = shop.set('items.0.price', 100);
            assert.equal(newApplePrice, 100);
            assert.equal(shop.items[0].price, 100);
        });
    });
    describe('#create', () => {
        it('should create an instance of a RealmObject', () => {
            const realmObject = RealmObject.create({
                name: 'Fruit Shop',
                items: [
                    { name: 'Apple', price: 240 },
                    { name: 'Orange', price: 300 },
                    { name: 'Melon', price: 500 },
                ],
                fruits: ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'],
            });
            expect(realmObject).to.be.an.instanceof(RealmObject);
        });
    });
    describe('#on', () => {
        it('should be eventful and listen for dispatched events', () => {
            const realmObject = new RealmObject({ testing: 'Is Fun!' });
            expect(typeof realmObject.on).to.equal('function');
        });
    });
    describe('#dispatchEvent', () => {
        it('should be eventful and be able to dispatch events', () => {
            const realmObject = new RealmObject({ testing: 'Is Fun!' });
            expect(typeof realmObject.dispatchEvent).to.equal('function');
        });
    });
});
