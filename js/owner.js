// play.js
var ownerState = {

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
		console.log(game.global.lastAngle);
		if (Math.abs(game.global.lastAngle) == 90 && game.global.lastPosY > game.world.height){
			console.log(game.global.lastAngle);
			this.owner = game.add.sprite(game.global.lastPosX, 0, 'proto');
			this.owner.angle = game.global.lastAngle;
			this.isDown = true;
		}
		if (game.global.lastAngle == -180 && game.global.lastPosX > game.world.width){
			console.log(game.global.lastAngle);
			this.owner = game.add.sprite(0, game.global.lastPosY, 'proto');
			this.owner.angle = game.global.lastAngle;
			this.isRight = true;
		}
		if (game.global.lastAngle == 0 && game.global.lastPosX < 0){
			console.log(game.global.lastAngle);
			this.owner = game.add.sprite(game.world.width, game.global.lastPosY, 'proto');
			this.owner.angle = game.global.lastAngle;
			this.isLeft = true;
		}
		if ( Math.abs(game.global.lastAngle) == 90 && game.global.lastPosY < 0){
			console.log(game.global.lastAngle);
			this.owner = game.add.sprite(game.global.lastPosX, game.world.height, 'proto');
			this.owner.angle = game.global.lastAngle;
			this.isUp = true;
		}


		this.owner.anchor.setTo(0.5,0.5);
		this.owner.animations.add('move', [0,1],8,true);
		this.owner.animations.add('stop', [1],5,true);
		this.owner.animations.play('move');
		this.owner.scale.setTo(2,2);


		game.physics.arcade.enable(this.owner);
		this.owner.body.velocity.x = game.global.lastVelX;
		this.owner.body.velocity.y = game.global.lastVelY;

		this.createWorld();
		createSpecial(this);


		this.moveAmount = game.global.moveSpeed;

		this.moveCount = 5;

		this.moveLabel = game.add.text(30,30,'moves: ' + this.moveCount,
			{font: '18px Arial', fill: '#ffffff'});


	},

	update: function(){
		game.physics.arcade.collide(this.owner, this.layer);
		game.physics.arcade.overlap(this.owner,this.special, this.win, null, this);

		this.move();
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

		if (this.owner.body.velocity.x ==0 && this.owner.body.velocity.y == 0){
			this.owner.animations.play('stop');
		}
		

		if(this.cursor.left.justPressed(10)){
			if (!this.isLeft) { 
				this.isLeft = true;
				say('left');
				moveUpdate(this);
				this.owner.body.velocity.x = -this.moveAmount;
				this.owner.body.velocity.y = 0;
				this.owner.animations.play('move');
				this.owner.angle = 0;
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
				this.owner.animations.play('move');
				this.owner.angle = 180;
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
				this.owner.animations.play('move');
				this.owner.angle = 90;
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
				this.owner.animations.play('move');
				this.owner.angle = -90;
				setMove(this, 'isDown');
			}
		}
	},

	killCheck: function(){

		if (this.owner.position.x > game.width + 16 || this.owner.position.x < -16 ||
			this.owner.position.y > game.height + 16 || this.owner.position.y < -16 ){
			// game.time.events.add(1000, this.lose, this);
			game.global.lastAngle = this.owner.angle;
			game.global.lastPosX = this.owner.position.x;
			game.global.lastPosY = this.owner.position.y;
			game.global.lastVelX = this.owner.body.velocity.x;
			game.global.lastVelY = this.owner.body.velocity.y;
			this.switchTo();
		}
	},

	switchTo:function(){
		say("you cat");
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