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

function say(string){
	console.log(string);
}

// function bigAdd(list, type){
// 	if (type == 'audio'){

// 	}
// }