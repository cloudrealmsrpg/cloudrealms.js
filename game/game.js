const CloudRealms = window.CloudRealms;
// create new game
const game = new CloudRealms({ title: 'Test Game' });
// create a map
const garden = new CloudRealms.Map({
    title: 'Garden of Realms',
    spriteSrc: 'land.png',
    tileSize: 16,
    tileMap: [
        { x: 0, y: 0, spriteX: 0, spriteY: 0, walkeable: false },
        { x: 1, y: 0, spriteX: 0, spriteY: 0, walkeable: false },
        { x: 2, y: 0, spriteX: 0, spriteY: 0, walkeable: false },
    ],
});
// create a playeable character
const player = new CloudRealms.Character({
    name: 'Player 1',
    playeable: true,
    player: true,
    spriteOptions: { src: 'player.png', spriteWidth: 36, spriteHeight: 36 },
});

// add player to map
garden.addCharacter(player, 10, 5);

// add map to game
game.mapManager.addMap(garden);

// start game
game.run();
