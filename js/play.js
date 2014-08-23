// play.js
var playState = {
	

	create: function(){
		this.cursor = game.input.keyboard.createCursorKeys();

		var spaceEnd = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px Arial', fill: '#ffffff'});
		spaceEnd.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.end, this);

		this.cat = game.add.sprite(game.world.width/4, game.world.centerY, 'proto');
		this.cat.anchor.setTo(0.5,0.5);
		this.cat.frame=0;

		this.cat.checkWorldBounds = true;
		this.cat.outOfBoundsKill = true;
		game.physics.arcade.enable(this.cat);

		this.owner = game.add.sprite(game.world.width - (game.world.width/4), game.world.centerY,'proto');
		this.owner.anchor.setTo(0.5,0.5);
		this.owner.frame =1;
		this.owner.scale.setTo(2,2);

		this.owner.checkWorldBounds = true;
		this.owner.outOfBoundsKill = true;
		game.physics.arcade.enable(this.owner);

		this.createWorld();


	},

	update: function(){
		game.physics.arcade.collide(this.cat, this.layer);
		game.physics.arcade.collide(this.owner, this.layer);
		game.physics.arcade.overlap(this.owner,this.cat, this.win, null, this);

		this.move();
		this.killCheck();
	},

	createWorld: function(){
		this.map = game.add.tilemap('first');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		this.map.setCollision(4);
	},

	move: function(){
		var moveAmount = 75;

		// this.cat.body.velocity.x = 0;
		// this.cat.body.velocity.y = 0;
		// this.owner.body.velocity.x = 0;
		// this.owner.body.velocity.y = 0;


		if(this.cursor.left.justPressed(10)){
			say('left');
			// this.cat.x -= moveAmount;
			// this.owner.x -= moveAmount*2;
			this.cat.body.velocity.x -= moveAmount*2;
			this.owner.body.velocity.x -= moveAmount;
			this.cat.body.velocity.y = 0;
			this.owner.body.velocity.y = 0;
		}
		if(this.cursor.right.justPressed(10)){
			say('right');
			// this.cat.x += moveAmount;
			// this.owner.x += moveAmount*2;
			this.cat.body.velocity.x += moveAmount*2;
			this.owner.body.velocity.x += moveAmount;
			this.cat.body.velocity.y = 0;
			this.owner.body.velocity.y = 0;
		}
		if(this.cursor.up.justPressed(10)){
			say('up');
			// this.cat.y -= moveAmount;
			// this.owner.y -= moveAmount*2;
			this.cat.body.velocity.y -= moveAmount*2;
			this.owner.body.velocity.y -= moveAmount;
			this.cat.body.velocity.x = 0;
			this.owner.body.velocity.x = 0;
		}
		if(this.cursor.down.justPressed(10)){
			say('down');
			// this.cat.y += moveAmount;
			// this.owner.y += moveAmount*2;
			this.cat.body.velocity.y += moveAmount*2;
			this.owner.body.velocity.y += moveAmount;
			this.cat.body.velocity.x = 0;
			this.owner.body.velocity.x = 0;
		}
	},

	killCheck: function(){
		if (!this.cat.alive){
			// game.time.events.add(1000, this.lose, this);
			this.lose();
		}
		if (!this.owner.alive){
			// game.time.events.add(1000, this.win, this);
			this.win();
		}
	},

	lose:function(){
		game.state.start('lose');
	},

	win: function(){
		game.state.start('win');	
	},

	end:function(){
		game.state.start('menu');
	}



	

};