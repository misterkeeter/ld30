// menu.js

var menuState = {
	
	create: function  () {

		var nameLabel = game.add.text(game.world.centerX, game.world.centerY, 'Kit Quack\nAttack',
			{ font: '150px ' + game.global.font, fill: '#ffffff', align: 'center' });
		nameLabel.anchor.setTo(0.5,0.5);


		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			'press space to begin',
			{font:'25px ' + game.global.font, fill: '#ffffff'});
		startLabel.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);

		this.loop = game.add.sound('intro',0.75,true);
		this.loop.play();
	},

	start: function(){
		this.loop.destroy();
		game.state.start('play');
	}
};

var winState = {
	create: function(){
		// this.game.resizeWorld();
		if(game.global.catScore == game.global.ownerScore){
			winText = "Hooray!\nQuackers and Milk\nfor Everyone!";
		} else if(game.global.catScore > game.global.ownerScore){
			winText = "Cat Wins\n" + game.global.catScore + " : " + game.global.ownerScore;
		} else if(game.global.catScore < game.global.ownerScore){
			winText = "Duck Wins\n" + game.global.ownerScore + " : " + game.global.catScore;
		}
		var nameLabel = game.add.text(game.world.centerX, game.world.centerY, winText,
			{ font: '50px ' + game.global.font, fill: '#ffffff' ,align: 'center' });
		nameLabel.anchor.setTo(0.5,0.5);

		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px ' + game.global.font, fill: '#ffffff' ,align: 'center' });
		startLabel.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);

		this.loop = game.add.sound('win',0.75);
		this.loop.play();
	},

	start: function(){
		this.loop.destroy();
		game.state.start('menu');
	}
};

var loseState = {
	create: function(){
		// game.world.width = game.screen.width;
		// game.world.height = game.screen.height;
		if(game.global.catScore == game.global.ownerScore){
			winText = "Hooray!\nQuackers and Milk\nfor Everyone!";
		} else if(game.global.catScore > game.global.ownerScore){
			winText = "Cat Wins\n" + game.global.catScore + " : " + game.global.ownerScore;
		} else if(game.global.catScore < game.global.ownerScore){
			winText = "Duck Wins\n" + game.global.ownerScore + " : " + game.global.catScore;
		}
		var nameLabel = game.add.text(game.world.centerX, game.world.centerY, winText,
			{ font: '50px ' + game.global.font, fill: '#ffffff', align: 'center' });
		nameLabel.anchor.setTo(0.5,0.5);

		var startLabel = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px ' + game.global.font, fill: '#ffffff'});
		startLabel.anchor.setTo(0.5,0.5);

			var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceKey.onDown.addOnce(this.start, this);

		this.loop = game.add.sound('lose',0.75);
		this.loop.play();
	},


	 start: function(){
	 	this.loop.destroy();
		game.state.start('menu');
	}
};

function spacer(){
	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
}