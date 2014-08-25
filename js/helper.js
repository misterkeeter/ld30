// helper function for faster game creation
function massLoadImage( toLoad ){ //takes an array and loads images from the assets folder
	for(var i in toLoad){
		var name = toLoad[i];
		var path = 'assets/' + name + '.png'; 
		console.log( name + " : " + path);
		game.load.image(name, path)
	}
}

function massLoadAudio( toLoad ){ //takes an array and loads audio from the assets folder
	for(var i in toLoad){
		var name = toLoad[i];
		var path = 'assets/' + name + '.png'; 
		console.log( name + " : " + path);
		game.load.audio(name, [path+".ogg", path+".mp3"]);
	}
}

function bigLoad(list, type){
	if (type == 'audio'){
		for(var i in list){
			var name = list[i];
			var path = 'assets/' + name; 
			console.log( name + " : " + path);
			game.load.audio(name, [path+".ogg", path+".mp3"]);
		}
	}

	if (type == 'image'){
		for(var i in list){
			var name = list[i];
			var path = 'assets/' + name + '.png'; 
			console.log( name + " : " + path);
			game.load.image(name, path);
		}
	}
}



function moveUpdate(object){
	if (object.moveCount > 0){
		object.moveCount -= 1;
		object.moveLabel.text = 'left: ' + object.moveCount;
	} 
}



function moveCheckTwo(object, cat, owner){
	zeroPoint = new Phaser.Point(0,0);
	// console.log(cat.moveCount == 0);
	// console.log(cat.body.velocity == zeroPoint);
	// console.log(owner.moveCount == 0);
	// console.log(owner.body.velocity == zeroPoint);

	if ((cat.moveCount == 0) && (Phaser.Point.equals(cat.body.velocity,zeroPoint)) && (owner.moveCount == 0) && (Phaser.Point.equals(owner.body.velocity, zeroPoint)) ) {
			console.log("loser");
			object.lose();
	}
	if (cat.moveCount == 0 ){
		if(!cat.stopped){
			console.log("no cat movement");
			object.wKey.enabled = false;
			object.aKey.enabled = false;
			object.sKey.enabled = false;
			object.dKey.enabled = false;
			cat.stopped = true;
		}
	}
	if (owner.moveCount == 0 ){
		if(!owner.stopped){
			console.log("no duck movement");
			object.cursor.up.enabled = false;
			object.cursor.down.enabled = false;
			object.cursor.left.enabled = false;
			object.cursor.right.enabled = false;
			owner.stopped = true;
		}
	}

}

function setMove(object, string){
	switch (string){
		case 'isLeft':
			object.isRight = false;
			object.isDown = false;
			object.isUp = false;
		break;
		case 'isRight':
			object.isLeft = false;
			object.isDown = false;
			object.isUp = false;
		break;
		case 'isUp':
			object.isRight = false;
			object.isDown = false;
			object.isLeft = false;
		break;
		case 'isDown':
			object.isRight = false;
			object.isLeft = false;
			object.isUp = false;
		break;
	}

}

function createSpecial(object){
	object.special = game.add.sprite(game.world.width-game.world.width/4,game.world.height-game.world.height/4, 'proto');
		object.special.frame = 5;

		game.physics.arcade.enable(object.special);
		object.special.anchor.setTo(0.5,0.5);	
}

function teleport(player){
	if (player.y > game.world.height + 5){ player.y = 0; }
	else if (player.y < - 5){player.y = game.world.height;}
	else if (player.x > game.world.width + 5){player.x = 0;}
	else if (player.x < -5){player.x = game.world.width;}
}



// function bigAdd(list, type){
// 	if (type == 'audio'){

// 	}
// }