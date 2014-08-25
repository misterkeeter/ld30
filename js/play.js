// play.js

var playState = {
	render: function(){
		// game.debug.body(this.cat);
		// game.debug.body(this.owner);
		// this.boxes.forEach(function(item){
		// 	game.debug.body(item);
		// });

		// game.debug.text("Time until event: " + game.time.events.duration, 32, 32);
	},

	create: function(){
		this.scale = 2;
		game.stage.smoothed = false;
		this.cursor = game.input.keyboard.createCursorKeys();
		this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

		

		this.createWorld();

		var spaceEnd = game.add.text(game.world.centerX, game.world.height-30,
			'press space to restart',
			{font:'25px ' + game.global.font, fill: '#ffffff'});
		spaceEnd.anchor.setTo(0.5,0.5);

		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.end, this);

		this.cat = game.add.sprite(game.world.width/4, game.world.centerY , 'proto');
		this.cat.anchor.setTo(0.5,0.5);
		this.cat.frame=1;
		this.cat.name = 'cat';
		this.cat.animations.add('move', [0,1],8,true);
		this.cat.animations.add('stop', [1]);
		this.cat.scale.setTo(this.scale,this.scale);
		this.cat.angle = 180;



		game.physics.arcade.enable(this.cat);

		this.owner = game.add.sprite(game.world.width - (game.world.width/4)  , game.world.centerY ,'proto');
		this.owner.anchor.setTo(0.5,0.5);
		this.owner.frame =1;
		this.owner.name = 'owner';
		this.owner.animations.add('move', [10,11,12,13],8,true);
		this.owner.animations.add('stop', [13],1,true);
		this.owner.scale.setTo(this.scale,this.scale);


		game.physics.arcade.enable(this.owner);



		this.moveAmount = game.global.moveSpeed;

		this.cat.moveCount = 25;
		this.owner.moveCount = 25;
		this.cat.picLabel = game.add.sprite(16, 16, 'proto');
		this.cat.picLabel.frame = 1;
		this.cat.moveLabel = game.add.text(96, 32,'left: ' + this.cat.moveCount,
			{font: '20px ' + game.global.font, fill: '#ffffff'});
		this.cat.moveLabel.anchor.setTo(0.5,0.5);

		this.owner.picLabel = game.add.sprite(game.world.width -144, 16, 'proto');
		this.owner.picLabel.frame = 11;
		this.owner.moveLabel = game.add.text(game.world.width -64, 32,'left: ' + this.owner.moveCount,
			{font: '20px ' + game.global.font, fill: '#ffffff'});
		this.owner.moveLabel.anchor.setTo(0.5,0.5);





		this.cat3 = game.add.sound('cat3', 0.25);
		this.owner3 = game.add.sound('owner3',0.25);
		this.death = game.add.sound('Death');

		this.loop = game.add.sound('loop',0.5,true);
		this.loop.play();

	},

	update: function(){
		game.physics.arcade.overlap(this.cat, this.boxes, this.tileSwap, null, this);
		game.physics.arcade.overlap(this.owner, this.boxes, this.tileSwap, null, this);
		game.physics.arcade.overlap(this.cat, this.owner, this.preLose, null, this);
		game.physics.arcade.overlap(this.cat, this.layer);
		game.physics.arcade.overlap(this.owner, this.layer);
		// game.physics.arcade.overlap(this.owner, this.layer, this.tileSwap, null this);
		// game.physics.arcade.overlap(this.owner,this.cat, this.win, null, this);

		this.move();
		teleport(this.cat);
		teleport(this.owner);
		moveCheck(this, this.cat);
		this.checkOn();

	},

	createWorld: function(){
		this.boxes = game.add.group();
		this.boxes.enableBody = true;
		this.spaceCount = 0;
		for ( i=0 ; i<7; i++){
			for(j=0; j<5; j++){
				temp = game.add.sprite(this.scale*(64*i+32), this.scale*(64*j+32), 'proto', 15, this.boxes);
				temp.scale.setTo(2*this.scale);
				// temp.anchor = (0.5,0.5);
				temp.body.setSize(16,16, 32,32);

				temp.name = i+":"+j;
				this.spaceCount +=1
			}
		}
		this.map = game.add.tilemap('first');
		this.map.addTilesetImage('tileset');
		this.layer = this.map.createLayer('Tile Layer 1');
		this.layer.resizeWorld();
		this.map.setCollision(3);

	},

	checkOn: function(){
		game.global.boxCount = 0;
		this.boxes.forEach(function(item){
			if (item.frame == 3) {
				game.global.boxCount++;
			}

		});
		if (game.global.boxCount == this.spaceCount) {this.win();}

	},

	flipVelo: function(object1,object2){
		console.log(object1.body.velocity);
		object1.body.velocity.x = -1*object1.body.velocity.x;
		object1.body.velocity.y = -1*object1.body.velocity.y;
		console.log('flipVelo :' + object1.name);
	},

	move: function(){
		if (this.cat.body.velocity.x ==0 && this.cat.body.velocity.y == 0){
			this.cat.animations.play('stop');
		}

		if (this.owner.body.velocity.x ==0 && this.owner.body.velocity.y == 0){
			this.owner.animations.play('stop');
		}


		

		if(this.aKey.justPressed(10)){
			if (!this.isLeft) { 
				this.cat.isLeft = true;
				say('left');
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.x = -this.moveAmount;
					this.cat.body.velocity.y = 0;
					this.cat.animations.play('move');
					this.cat.angle = 0;
				}
				setMove(this.cat, 'isLeft');
				moveUpdate(this.cat);
			}
		}
		if(this.cursor.left.justPressed(10)){
			if (!this.isLeft) { 
				this.owner.isLeft = true;
				say('left');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.x = -this.moveAmount;
					this.owner.body.velocity.y = 0;
					this.owner.animations.play('move');
					this.owner.angle = 0;
				}
				setMove(this.owner, 'isLeft');
				moveUpdate(this.owner);
			}
		}
		if(this.dKey.justPressed(10)){
			if (!this.cat.isRight){
				this.cat.isRight = true;
				say('right');
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.x = this.moveAmount;
					this.cat.body.velocity.y = 0;
					this.cat.animations.play('move');
					this.cat.angle = 180;
				}
				setMove(this.cat, 'isRight');
				moveUpdate(this.cat);
			}
		}
		if(this.cursor.right.justPressed(10)){
			if (!this.owner.isRight){
				this.owner.isRight = true;
				say('right');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.x = this.moveAmount;
					this.owner.body.velocity.y = 0;
					this.owner.animations.play('move');
					this.owner.angle = 180;
				}
				setMove(this.owner, 'isRight');
				moveUpdate(this.owner);
			}
		}

		if(this.wKey.justPressed(10)){
			if (!this.cat.isUp){
				this.cat.isUp = true;
				say('up');
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.y = -this.moveAmount;
					this.cat.body.velocity.x = 0;
					this.cat.animations.play('move');
					this.cat.angle = 90;
				}
				setMove(this.cat, 'isUp');
				moveUpdate(this.cat);
			}
		}
		if(this.cursor.up.justPressed(10)){
			if (!this.owner.isUp){
				this.owner.isUp = true;
				say('up');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.y = -this.moveAmount;
					this.owner.body.velocity.x = 0;
					this.owner.animations.play('move');
					this.owner.angle = 90;
				}
				setMove(this.owner, 'isUp');
				moveUpdate(this.owner);
			}
		}

		if(this.sKey.justPressed(10)){
			if (!this.cat.isDown){
				this.cat.isDown = true;
				say('down');
				if (this.cat.moveCount > 0 ){
					this.cat.body.velocity.y = this.moveAmount;
					this.cat.body.velocity.x = 0;
					this.cat.animations.play('move');
					this.cat.angle = 270;
				}
				setMove(this.cat, 'isDown');
				moveUpdate(this.cat);
			}
		}

		if(this.cursor.down.justPressed(10)){
			if (!this.owner.isDown){
				this.owner.isDown = true;
				say('down');
				if (this.owner.moveCount > 0 ){
					this.owner.body.velocity.y = this.moveAmount;
					this.owner.body.velocity.x = 0;
					this.owner.animations.play('move');
					this.owner.angle = 270;
				}
				setMove(this.owner, 'isDown');
				moveUpdate(this.owner);
			}
		}
	},

	killCheck: function(){
		if (this.cat.position.x > game.width + 16|| this.cat.position.x < -16 ||
			this.cat.position.y > game.height + 16 || this.cat.position.y < -16 ){
			// game.time.events.add(1000, this.lose, this);
			game.global.AlastAngle = this.cat.angle;
			game.global.AlastPosX = this.cat.position.x;
			game.global.AlastPosY = this.cat.position.y;
			game.global.AlastVelX = this.cat.body.velocity.x;
			game.global.AlastVelY = this.cat.body.velocity.y;
			this.toOwner();
		}
		if (this.owner.position.x > game.width + 16 || this.owner.position.x < -16 ||
			this.owner.position.y > game.height + 16 || this.owner.position.y < -16 ){
			// game.time.events.add(1000, this.lose, this);
			game.global.BlastAngle = this.owner.angle;
			game.global.BlastPosX = this.owner.position.x;
			game.global.BlastPosY = this.owner.position.y;
			game.global.BlastVelX = this.owner.body.velocity.x;
			game.global.BlastVelY = this.owner.body.velocity.y;
			this.toCat();
		}
	},

	tileSwap: function(object1, object2){
		if(object1.over !== object2.name){
			if(object1.name == 'cat'){
			if(object2.frame == 3) {object2.frame = 6;}
			else if(object2.frame !== 3){ 
					if(object2.frame == 7){
						object2.frame = 3;
						this.cat3.play();
					}else{
						object2.frame = 6;
					}
				}
			}
			if(object1.name == 'owner'){
				if(object2.frame == 3) {object2.frame = 7;}
				else if(object2.frame !== 3){
					if(object2.frame == 6){
						object2.frame = 3;
						this.owner3.play();
					}else{
						object2.frame = 7;
					}
				} 
			}
			object1.over = object2.name; 
			// console.log(object1.over);
		}

		
		
		
	},

	// toCat:function(){
	// 	say("you are cat");
	// 	game.state.start('cat');
	// },

	// toOwner:function(){
	// 	say("you are owner");
	// 	game.state.start('owner');
	// },

	win: function(){
		say("you win");
		this.loop.destroy();
		game.state.start('win');	
	},

	preLose: function(){
		zeroPoint = new Phaser.Point(0,0);
		if(!this.dead){
			this.dead = true;
			this.cat.body.velocity = zeroPoint;
			this.owner.body.velocity = zeroPoint;
			this.loop.stop();
			this.death.play();
		}
		
		// game.time.events.add(Phaser.Timer.SECOND * 4, this.lose, this);
		game.time.events.add(Phaser.Timer.SECOND * 0.2, this.lose, this);
	},

	lose: function(){
		say("you lose");
		this.loop.destroy();
		this.dead = false;
		game.state.start('lose');
	},

	end:function(){
		this.loop.destroy();
		game.state.start('menu');
	}



	

};