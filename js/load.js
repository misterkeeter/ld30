// load.js
var loadState = {

	preload: function(){
		var loadingLabel = game.add.text(game.world.centerX, 40, 'loading...',
			{ font: '30px Arial', fill: '#ffffff'});
		loadingLabel.anchor.setTo(0.5,0.5);

		//Display the progress bar
		var progressBar = game.add.sprite(game.world.centerX, 2, 'progressBar');
		progressBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(progressBar);

		game.load.spritesheet('proto','assets/prototype.png',32,32);
		game.load.image('tileset', 'assets/prototype.png');
		game.load.tilemap('first', 'assets/firstmap.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create: function(){
		game.state.start('menu');
	}
};

