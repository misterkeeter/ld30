// play.js
var playState = {

	create: function(){
		game.stage.smoothed = false;
		this.cursor = game.input.keyboard.createCursorKeys();

		var spaceEnd = game.add.text(game.world.centerX, game.world.height-80,
			'press space to restart',
			{font:'25px Arial', fill: '#ffffff'});
		spaceEnd.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.end, this);

		this.cat = game.add.sprite(game.world.width/4, game.world.centerY, 'proto');
		this.cat.anchor.setTo(0.5,0.5);
		this.cat.frame=1;
		this.cat.animations.add('move', [0,1],8,true);
		this.cat.animations.add('stop', [1]);



		game.physics.arcade.enable(this.cat);

		this.owner = game.add.sprite(game.world.width - (game.world.width/4), game.world.centerY,'proto');
		this.owner.anchor.setTo(0.5,0.5);
		this.owner.frame =1;
		this.owner.animations.add('move', [0,1],8,true);
		this.owner.animations.add('stop', [1],1,true);
		this.owner.scale.setTo(2,2);


		game.physics.arcade.enable(this.owner);

		this.createWorld();

		this.moveAmount = game.global.moveSpeed;

		this.cat.moveCount = 5;
		this.owner.moveCount = 10;

		this.cat.moveLabel = game.add.text(30,30,'moves: ' + this.cat.moveCount,
			{font: '18px Arial', fill: '#ffffff'});

		this.owner.moveLabel = game.add.text(game.world.width-100,30,'moves: ' + this.owner.moveCount,
			{font: '18px Arial', fill: '#ffffff'});

		this.isDown = false;
		this.isRight = false;
		this.isUp = false;
		this.isLeft = false;

	},

	update: function(){
		game.physics.arcade.collide(this.cat, this.layer);
		game.physics.arcade.collide(this.owner, this.layer);
		game.physics.arcade.overlap(this.owner,this.cat, this.win, null, this);

		this.move();

		this.killCheck();

		moveCheckTwo(this, this.cat, this.owner);
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

		if (this.owner.body.velocity.x ==0 && this.owner.body.velocity.y == 0){
			this.owner.animations.play('stop');
		}
		

		if(this.cursor.left.justPressed(10)){
			if (!this.isLeft) { 
				this.isLeft = true;
				say('left');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.x = -this.moveAmount;
					this.owner.body.velocity.y = 0;
					this.owner.animations.play('move');
					this.owner.angle = 0;
				}
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.x = -this.moveAmount;
					this.cat.body.velocity.y = 0;
					this.cat.animations.play('move');
					this.cat.angle = 0;
				}
				setMove(this, 'isLeft');
				moveUpdate(this.owner);
				moveUpdate(this.cat);
			}
		}
		if(this.cursor.right.justPressed(10)){
			if (!this.isRight){
				this.isRight = true;
				say('right');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.x = this.moveAmount;
					this.owner.body.velocity.y = 0;
					this.owner.animations.play('move');
					this.owner.angle = 180;
				}
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.x = this.moveAmount;
					this.cat.body.velocity.y = 0;
					this.cat.animations.play('move');
					this.cat.angle = 180;
				}
				setMove(this, 'isRight');
				moveUpdate(this.owner);
				moveUpdate(this.cat);
			}
		}
		if(this.cursor.up.justPressed(10)){
			if (!this.isUp){
				this.isUp = true;
				say('up');
				
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.y = -this.moveAmount;
					this.owner.body.velocity.x = 0;
					this.owner.animations.play('move');
					this.owner.angle = 90;
				}
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.y = -this.moveAmount;
					this.cat.body.velocity.x = 0;
					this.cat.animations.play('move');
					this.cat.angle = 90;
				}
				setMove(this, 'isUp');
				moveUpdate(this.owner);
				moveUpdate(this.cat);
			}
		}
		if(this.cursor.down.justPressed(10)){
			if (!this.isDown){
				this.isDown = true;
				say('down');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.y = this.moveAmount;
					this.owner.body.velocity.x = 0;
					this.owner.animations.play('move');
					this.owner.angle = 270;
				}
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.y = this.moveAmount;
					this.cat.body.velocity.x = 0;
					this.cat.animations.play('move');
					this.cat.angle = 270;
				}
				setMove(this, 'isDown');
				moveUpdate(this.owner);
				moveUpdate(this.cat);
			}
		}
	},

	killCheck: function(){
		if (this.cat.position.x > game.width + 16|| this.cat.position.x < -16 ||
			this.cat.position.y > game.height + 16 || this.cat.position.y < -16 ){
			// game.time.events.add(1000, this.lose, this);
			game.global.lastAngle = this.cat.angle;
			game.global.lastPosX = this.cat.position.x;
			game.global.lastPosY = this.cat.position.y;
			game.global.lastVelX = this.cat.body.velocity.x;
			game.global.lastVelY = this.cat.body.velocity.y;
			this.toOwner();
		}
		if (this.owner.position.x > game.width + 16 || this.owner.position.x < -16 ||
			this.owner.position.y > game.height + 16 || this.owner.position.y < -16 ){
			// game.time.events.add(1000, this.lose, this);
			game.global.lastAngle = this.owner.angle;
			game.global.lastPosX = this.owner.position.x;
			game.global.lastPosY = this.owner.position.y;
			game.global.lastVelX = this.owner.body.velocity.x;
			game.global.lastVelY = this.owner.body.velocity.y;
			this.toCat();
		}
	},

	toCat:function(){
		say("you are cat");
		game.state.start('cat');
	},

	toOwner:function(){
		say("you are owner");
		game.state.start('owner');
	},

	win: function(){
		say("you win");
		game.state.start('win');	
	},

	lose: function(){
		say("you lose");
		game.state.start('lose');
	},

	end:function(){
		game.state.start('menu');
	}



	

};