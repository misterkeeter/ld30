// game.js

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameDiv');

game.global = { 
	score: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('cat', catState);
game.state.add('owner', ownerState);
game.state.add('win', winState);
game.state.add('lose', loseState);

game.state.start('boot');