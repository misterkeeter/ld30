// play.js
var catState = {

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
		game.physics.arcade.collide(this.cat, this.layer);
		game.physics.arcade.overlap(this.cat,this.special, this.win, null, this);

		this.move();
		// this.map.tilePosition.x = -game.camera.x;
  //   	this.map.tilePosition.y = -game.camera.y;
		this.killCheck();
		moveCheck(this, this.cat);
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
		

		// this.cat.body.velocity.x = 0;
		// this.cat.body.velocity.y = 0;
		// this.owner.body.velocity.x = 0;
		// this.owner.body.velocity.y = 0;
		// this.cat.body.velocity -= this.cat.body.velocity/10;
		// this.owner.body.velocity -= this.owner.body.velocity/10;

		// if (this.moveAmount <= 10){
		// 	this.cat.body.velocity = 0
		// 	this.owner.body.velocity = 0
		// }


		if(this.cursor.left.justPressed(10)){
			if (!this.isLeft) { 
				this.isLeft = true;
				say('left');
				moveUpdate(this);
				this.cat.body.velocity.x = -this.moveAmount*2;
				this.cat.body.velocity.y = 0;
				setMove(this,'isLeft');
			}
		}
		if(this.cursor.right.justPressed(10)){
			if (!this.isRight){
				this.isRight = true;
				say('right');
				moveUpdate(this);
				this.cat.body.velocity.x = this.moveAmount*2;
				this.cat.body.velocity.y = 0;
				setMove(this,'isRight');
			}
		}
		if(this.cursor.up.justPressed(10)){
			if (!this.isUp){
				this.isUp = true;
				say('up');
				moveUpdate(this);
				this.cat.body.velocity.y = -this.moveAmount*2;
				this.cat.body.velocity.x = 0;
				setMove(this,'isUp');
			}
		}
		if(this.cursor.down.justPressed(10)){
			if (!this.isDown){
				this.isDown = true;
				say('down');
				moveUpdate(this);
				this.cat.body.velocity.y = this.moveAmount*2;
				this.cat.body.velocity.x = 0;
				setMove(this,'isDown');
			}
		}
	},

	killCheck: function(){
		if (!this.cat.alive){
			// game.time.events.add(1000, this.lose, this);
			this.switchTo();
		}

	},

	// moveCheck: function(){
	// 	if (this.moveCount <=0){
	// 		this.toOwner();
	// 	}
	// },

	// moveUpdate: function(){
	// 	this.moveCount -= 1;
	// 	this.moveLabel.text = 'moves: ' + this.moveCount;
	// },


	switchTo:function(){
		say("you owner");
		game.state.start('owner');
	},

	lose: function(){
		say("you loser");
		game.state.start('lose');
	},

	win: function(){
		say("you win");
		game.state.start('play');	
	},

	end:function(){
		game.state.start('menu');
	}



	

};