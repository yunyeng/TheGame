// var loader = require("./loader.js");
var Game = require("./Game");
var game = new Game();

function Player(game, name, country){
// function Player(name, country, email, gender, password, password2, something like login){

	// CURRENT GAME OBJECT
	this.game = game;

	this.news = "";

	this.USA        = 0;
	this.RUSSIA     = 1;
	this.countries = [
	{
		name: "United States of America",
		abbr: "USA",
		economy: 2450000000,
		population: 322014853,
		military: 750,
		education: 700,
		health: 300,
		entertainment: 900
	}, 
	{
		name: "Russian Federation",
		abbr: "RUS",
		economy: 416000000,
		population: 143975923,
		military: 700,
		education: 800,
		health: 700,
		entertainment: 250
	}
	];
	this.name       = name;
	this.country    = undefined;

	// console.log("Country = " + this.country);
	if(country   === this.USA){
		this.country    = this.countries[country];
	} else if(country === this.RUSSIA){
		this.country    = this.countries[country];
	} else {
		throw new Error("Wrong Country Code!");
	}

	this.getNews    = getNews;
	this.getUSANews = getUSANews;
	this.getRUSNews = getRUSNews;

	this.addEcon    = addEcon;
	this.subEcon    = subEcon;

	this.addPopul   = addPopul;
	this.subPopul   = subPopul;

	this.addMilit   = addMilit;
	this.subMilit   = subMilit;

	this.build      = build;
 
}

function getNews(){
	if(this.country.abbr === "USA"){
		this.getUSANews();
	} else if(this.country.abbr === "RUS"){
		this.getRUSNews();
	}
}

function getUSANews(){
	var num = Math.floor((Math.random() * 100)) + 1);
	if(num <= 10){
		this.news = "ISIS captured another US refugee, and released a video.";
	} else if(num <= 20){
		this.news = "Another mass shooting in High School today.";
	} else if(num <= 30){
		this.news = "New technology in Audio/Video industry was presented in San Francisco.";
	} else if(num <= 40){
		this.news = "Policemen shot an innocent Black teenager in broad day in Detroit.";
	} else if(num <= 50){
		this.news = "US Hockey team ";
	} else if(num <= 60){
		this.news = "";
	} else if(num <= 70){
		this.news = "";
	} else if(num <= 80){
		this.news = "";
	} else if(num <= 90){
		this.news = "";
	} else if(num <= 100){
		this.news = "";
	}
}

function getRUSNews(){
	var num = Math.floor((Math.random() * 100)) + 1);
	if(num <= 10){

	} else if(num <= 20){

	} else if(num <= 30){

	} else if(num <= 40){

	} else if(num <= 50){

	} else if(num <= 60){

	} else if(num <= 70){

	} else if(num <= 80){

	} else if(num <= 90){

	} else if(num <= 100){
		
	}
}

function addEcon(){
	if(this.country.economy >= 999999999999)
		throw new Error("Your economy is overrated.");
	this.country.economy += 1000;
}

function subEcon(){
	if(this.country.economy <= 500)
		throw new Error("Your Economy is exploded.");
	this.country.economy -= 1000;
}

function addPopul(){
	if(this.country.population >= 999999999)
		throw new Error("Over Population!");
	this.country.population += 5000;
}

function subPopul(){
	if(this.country.population <= 100000)
		throw new Error("Your Population is unsufficient!");
	this.country.population -= 5000;
}

function addMilit(){
	if(this.country.military >= 999999)
		throw new Error("Army is too strong! Country became Military Country!");
	this.country.militart += 1000;
}

function subMilit(){
	if(this.country.military <= 10)
		throw new Error("Your have no military whatsoever!");
	this.country.military--;
}

function build(building){
	switch(building){
		case "university":
			break;
		case "stadium":
			break;
		case "prison":
			break;
		case "military base":
			break;
		case "oil reserve":
			break;
		case "island":
			break;

	}

}

module.exports = Player;