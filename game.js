function Game(){

	this.OFF    = 0;
	this.ON     = 1;

	this.status = 0;

	this.start  = start;
	this.end    = end;

	this.show   = show;

}

function start(){
	if(this.status === this.ON)
		throw new Error("This game is already ON!");
	this.status = this.ON;
	console.log("Game Started.");
}

function end(){
	if(this.status === this.OFF)
		throw new Error("This game is already OFF!");
	this.status = this.OFF;
	console.log("Game Ended.");
}

function show(){
	
}


module.exports = Game;