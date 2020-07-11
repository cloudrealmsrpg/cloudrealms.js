# Cloudrealms RPG/MMORPG Engine

Just getting started will fill up later.

```javascript
import Game from '@cloudrealms';
import { Character } from '@cloudrealms/character';

const game = new Game({name: 'My Adventure'});
const player = new Character({name: 'Frodo'});

game.play({with: [player]});
```

## License

MIT
