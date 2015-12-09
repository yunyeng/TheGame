var express 		 = require("express"),
	fs 				 = require('fs'),
	bodyParser 		 = require("body-parser"),
	mongojs 		 = require("mongojs"),
	moment			 = require("moment"),
	port 			 = process.env.PORT || 8080,
	app 			 = express(),
	db 				 = mongojs('thegame', [])
	Player           = require('./Player');


var player = new Player("yunyeng", 1);
console.log(player.country.population);

app.use(bodyParser.json());
// setup the logger
app.use(express.static(__dirname + '/public'));

app.get("/questions", function(req, res){
	db.quests.find({"ans1": {$exists:true}}, function(err, doc){
		res.json(doc);
	});
});



// Run the Server
app.listen(port, function() {
    console.log('Server listening on port: ' + port);
});