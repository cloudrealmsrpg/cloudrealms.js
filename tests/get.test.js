import { assert } from 'chai';
import get from '../src/framework/object/get';

describe('get', () => {
    it('should return the value at the path of an array', () => {
        const array = ['Apple', 'Orange', 'Melon', 'Lemon', 'Grape'];
        assert.equal(get(array, 1), `Orange`);
        assert.equal(get(array, 4), `Grape`);
    });
    it('should return the value at the path of an object', () => {
        const object = {
            type: 'Person',
            name: 'Ron',
            skills: ['Coding', 'Gaming', 'Business'],
            friends: [{ name: 'Evan' }, { name: 'Shiv' }],
        };
        assert.equal(get(object, 'friends.1.name'), `Shiv`);
        assert.equal(get(object, 'name'), `Ron`);
        assert.equal(get(object, 'skills.1'), `Gaming`);
    });
    it('should return the value at the path of a function that returns object or array', () => {
        const returnsObject = () => {
            return {
                type: 'Car',
                name: 'Honda',
                model: 'Accord',
                year: '1999',
            };
        };
        const returnsArray = () => ['Hello', ' ', 'World'];
        assert.equal(get(returnsObject, 'name'), `Honda`);
        assert.equal(get(returnsArray, '2'), `World`);
    });
});
