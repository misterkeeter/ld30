// menu.js

var menuState = {
	
	create: function  () {

		var nameLabel = game.add.text(game.world.centerX, game.world.centerY, 'Connected Worlds',
			{ font: '50px Arial', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5,0.5);


		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			'press space to begin',
			{font:'25px Arial', fill: '#ffffff'});
		startLabel.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
	},

	start: function(){
		game.state.start('play');
	}
};

var winState = {
	create: function(){
		var nameLabel = game.add.text(game.world.centerX, game.world.centerY, 'You Won',
			{ font: '50px Arial', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5,0.5);

		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px Arial', fill: '#ffffff'});
		startLabel.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
	},

	start: function(){
		game.state.start('menu');
	}
};

var loseState = {
	create: function(){
		var nameLabel = game.add.text(game.world.centerX, game.world.centerY, 'You Lose',
			{ font: '50px Arial', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5,0.5);

		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px Arial', fill: '#ffffff'});
		startLabel.anchor.setTo(0.5,0.5);

			var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceKey.onDown.addOnce(this.start, this);
	},


	 start: function(){
		game.state.start('menu');
	}
};

function spacer(){
	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
}