# Cloudrealms RPG/MMORPG Engine

Just getting started will fill up later.

```javascript
import Game from '@cloudrealms';
import Character, { Ability } from '@cloudrealms/character';

const game = new Game({ name: 'My Adventure' });
const player = new Character({ name: 'Frodo', with: [new Ability('Ring Beaerer')] });

// eventful objects
player.move(3, 4).then((position) => {
    // do something
});

// listeners
player.on('move.completed', function (position) {
    // do something
});

// within class
class Baphomet extends Monster {
    // do something when a player comes withing bounds
    objectWithinBounds(target) {
        this.moveTo(target).then((position) => {
            this.attack(target);
        });
    }

    // events in class
    moveCompleted(position) {
        // do something
    }
}

game.play({ with: [player] });
```

## License

MIT
