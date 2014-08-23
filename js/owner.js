// play.js
var ownerState = {

	create: function(){
		this.cursor = game.input.keyboard.createCursorKeys();

		var spaceEnd = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px Arial', fill: '#ffffff'});
		spaceEnd.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.end, this);





		this.owner = game.add.sprite(game.world.width - (game.world.width/4), game.world.centerY,'proto');
		this.owner.anchor.setTo(0.5,0.5);
		this.owner.frame =1;
		this.owner.scale.setTo(2,2);

		this.owner.checkWorldBounds = true;
		this.owner.outOfBoundsKill = true;
		game.physics.arcade.enable(this.owner);

		this.createWorld();
		createSpecial(this);

		this.moveSpeed = 75;
		this.restSpeed = 0;
		this.moveAmount = this.moveSpeed;

		this.moveCount = 10;

		this.moveLabel = game.add.text(30,30,'moves: ' + this.moveCount,
			{font: '18px Arial', fill: '#ffffff'});

		this.isDown = false;
		this.isRight = false;
		this.isUp = false;
		this.isLeft = false;

	},

	update: function(){
		game.physics.arcade.collide(this.owner, this.layer);
		game.physics.arcade.overlap(this.owner,this.special, this.win, null, this);

		this.move();
		// this.map.tilePosition.x = -game.camera.x;
  //   	this.map.tilePosition.y = -game.camera.y;
		this.killCheck();
		moveCheck(this, this.owner);
	},

	createWorld: function(){
		this.map = game.add.tilemap('first');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		this.map.setCollision(4);
		this.layer.fixedToCamera;
	},

	move: function(){
		

		if(this.cursor.left.justPressed(10)){
			if (!this.isLeft) { 
				this.isLeft = true;
				say('left');
				moveUpdate(this);
				this.owner.body.velocity.x = -this.moveAmount;
				this.owner.body.velocity.y = 0;
				setMove(this, 'isLeft');
			}
		}
		if(this.cursor.right.justPressed(10)){
			if (!this.isRight){
				this.isRight = true;
				say('right');
				moveUpdate(this);
				this.owner.body.velocity.x = this.moveAmount;
				this.owner.body.velocity.y = 0;
				setMove(this, 'isRight');
			}
		}
		if(this.cursor.up.justPressed(10)){
			if (!this.isUp){
				this.isUp = true;
				say('up');
				moveUpdate(this);
				this.owner.body.velocity.y = -this.moveAmount;
				this.owner.body.velocity.x = 0;
				setMove(this, 'isUp');
			}
		}
		if(this.cursor.down.justPressed(10)){
			if (!this.isDown){
				this.isDown = true;
				say('down');
				moveUpdate(this);
				this.owner.body.velocity.y = this.moveAmount;
				this.owner.body.velocity.x = 0;
				setMove(this, 'isDown');
			}
		}
	},

	killCheck: function(){

		if (!this.owner.alive){
			// game.time.events.add(1000, this.win, this);
			this.switchTo();
		}
	},

	switchTo:function(){
		say("you lose");
		game.state.start('cat');
	},

	win: function(){
		say("you win");
		game.state.start('play');	
	},

	lose: function(){
		say("you loser");
		game.state.start('lose');
	},

	end:function(){
		game.state.start('menu');
	}



	

};