// play.js
var catState = {

	create: function(){
		game.stage.smoothed = false;
		this.cursor = game.input.keyboard.createCursorKeys();

		var spaceEnd = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px Arial', fill: '#ffffff'});
		spaceEnd.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.end, this);

		this.isDown = false;
		this.isRight = false;
		this.isUp = false;
		this.isLeft = false;

		if (game.global.lastPosY > game.world.height){

			this.cat = game.add.sprite(game.global.lastPosX, 0, 'proto');
			this.cat.angle = game.global.lastAngle;
			this.isDown = true;
		}
		else if (game.global.lastPosX > game.world.width){

			this.cat = game.add.sprite(0, game.global.lastPosY, 'proto');
			this.cat.angle = game.global.lastAngle;
			this.isRight = true;
		}
		else if (game.global.lastPosX < 0){

			this.cat = game.add.sprite(game.world.width, game.global.lastPosY, 'proto');
			this.cat.angle = game.global.lastAngle;
			this.isLeft = true;
		}
		else if (game.global.lastPosY < 0){

			this.cat = game.add.sprite(game.global.lastPosX, game.world.height, 'proto');
			this.cat.angle = game.global.lastAngle;
			this.isUp = true;
		}

		
		this.cat.anchor.setTo(0.5,0.5);
		this.cat.frame=1;
		this.cat.animations.add('move', [0,1],8,true);
		this.cat.animations.add('stop', [1],5,true);
		this.cat.animations.play('move');
		this.cat.scale.setTo(3,3);

		game.physics.arcade.enable(this.cat);
		this.cat.body.velocity.x = game.global.lastVelX;
		this.cat.body.velocity.y = game.global.lastVelY;



		this.createWorld();

		createSpecial(this);

		this.moveAmount = game.global.moveSpeed;
		this.moveCount = 10;

		this.moveLabel = game.add.text(30,30,'moves: ' + this.moveCount,
			{font: '18px Arial', fill: '#ffffff'});

		




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
		

		if (this.cat.body.velocity.x ==0 && this.cat.body.velocity.y == 0){
			this.cat.animations.play('stop');
		}


		if(this.cursor.left.justPressed(10)){
			if (!this.isLeft) { 
				this.isLeft = true;
				say('left');
				moveUpdate(this);
				this.cat.body.velocity.x = -this.moveAmount;
				this.cat.body.velocity.y = 0;
				this.cat.animations.play('move');
				this.cat.angle = 0;
				setMove(this,'isLeft');
			}
		}
		if(this.cursor.right.justPressed(10)){
			if (!this.isRight){
				this.isRight = true;
				say('right');
				moveUpdate(this);
				this.cat.body.velocity.x = this.moveAmount;
				this.cat.body.velocity.y = 0;
				this.cat.animations.play('move');
				this.cat.angle = 180;
				setMove(this,'isRight');
			}
		}
		if(this.cursor.up.justPressed(10)){
			if (!this.isUp){
				this.isUp = true;
				say('up');
				moveUpdate(this);
				this.cat.body.velocity.y = -this.moveAmount;
				this.cat.body.velocity.x = 0;
				this.cat.animations.play('move');
				this.cat.angle = 90;
				setMove(this,'isUp');
			}
		}
		if(this.cursor.down.justPressed(10)){
			if (!this.isDown){
				this.isDown = true;
				say('down');
				moveUpdate(this);
				this.cat.body.velocity.y = this.moveAmount;
				this.cat.body.velocity.x = 0;
				this.cat.animations.play('move');
				this.cat.angle = -90;
				setMove(this,'isDown');
			}
		}
	},

	killCheck: function(){
		if (this.cat.position.x > game.width + 16 || this.cat.position.x < -16 ||
			this.cat.position.y > game.height +16 || this.cat.position.y < -16 ){
			// game.time.events.add(1000, this.lose, this);
			game.global.lastAngle = this.cat.angle;
			game.global.lastPosX = this.cat.position.x;
			game.global.lastPosY = this.cat.position.y;
			game.global.lastVelX = this.cat.body.velocity.x;
			game.global.lastVelY = this.cat.body.velocity.y;
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