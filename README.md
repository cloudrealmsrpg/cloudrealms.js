# Cloudrealms RPG/MMORPG Engine

Just getting started will fill up later.

```javascript
import Game from '@cloudrealms';
import Character, { Ability } from '@cloudrealms/character';

const game = new Game({ name: 'My Adventure' });
const player = new Character({ name: 'Frodo', with: [new Ability('Ring Beaerer')] });

game.play({ with: [player] });
```

## License

MIT
