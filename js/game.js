// game.js

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameDiv');

game.global = { 
	lastPosX:0,
	lastPosY:0,
	lastAngle:0,
	lastVelX:0,
	lastVelY:0,
	moveSpeed:300,
	ownerScore: 0,
	catScore: 0,
	deadTeleCat: 0,
	deadTeleOwner: 0,
	font:'Graduate'
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

game.antialias = false;
