import { assert } from 'chai';
import Character from '../src/character/index';

const addContext = require('mochawesome/addContext');

describe('Character', () => {
    const player = new Character({ name: 'Cloud' });
    describe('#.name', () => {
        it('the character name should be set', () => {
            assert.equal(player.name, `Cloud`);
        });
    });
    describe('#move', () => {
        it('should move the character in given x and y axis directions', () => {
            player.on('action.started', function (event) {
                console.log(`      ✓ ${event.type} event fired, Player is about to move`);
            });
            player.on('action.completed', function (event) {
                console.log(`      ✓ ${event.type} event fired, Player has moved`);
            });
            player.move(1, 1);
            // should implement get position
            const position = player.getPosition();
            assert.equal(position.x, 1);
            assert.equal(position.y, 1);
        });
    });
});
