var app = angular.module("app", []);
app.controller("HomeCtrl", ["$scope", "$http", function($scope, $http){

$scope.questTexts = {};

var questions = {};


$http.get("/questions").success(function(res){
	// console.log(res)
	for(var i=0;i<res.length; i++){
		if($scope.questTexts[res[i].id] == undefined && res[i].target != null){
			$scope.questTexts[res[i].id] = res[i].text;

			questions[res[i].id] = {
				text: res[i].text,
				answers: [
					{val: 0, text: ""},
					{val: 0, text: res[i].ans1},
					{val: 0, text: res[i].ans2},
					{val: 0, text: res[i].ans3},
					{val: 0, text: res[i].ans4}
				]
			};


		}

	}

	for(var i=0;i<res.length; i++){
		questions[res[i].id].answers[res[i].target.answer].val++;
	}

	
});


// $http.get("/graph").success(function(res){

// 	var dataset = res;
// 	console.log(dataset);

// 	var colors = d3.scale.category10();

// 	var w          = 1200;
// 	var h          = 800;
// 	var padding    = 30;
// 	var svg2 = d3.select("#graph")
// 					.append("svg")
// 					.attr("width", w)
// 		   			.attr("height", h);

// 	var force = d3.layout.force()
// 						 .nodes(dataset.nodes)
// 						 .links(dataset.edges)
// 						 .size([w, h])
// 						 .linkDistance([50])
// 						 .charge([-100])
// 						 .start();

// 	var edges = svg2.selectAll("line")
// 				   .data(dataset.edges)
// 				   .enter()
// 				   .append("line")
// 				   .style("stroke", "#ccc")
// 				   .style("stroke-width", 3)
// 				   .on("mouseover", function(d){
// 						// var xPos = parseFloat(d3.select(this).attr("x"));
// 						// var yPos = parseFloat(d3.select(this).attr("y")) - 10;
// 						svg2.append("text")
// 							.attr("id", "edgetip")
// 							.attr("x", 400)
// 							.attr("y", 200)
// 							.attr("text-anchor", "middle")
// 							.attr("font-family", "sans-serif")
// 							.attr("font-size", "16px")
// 							.attr("font-weight", "bold")
// 							.attr("fill", "black")
// 							.text(d.question);
// 					})
// 				   .on("mouseout", function(){
// 						d3.select("#edgetip").remove();
// 				   });

// 	var nodes = svg2.selectAll("circle")
// 				   .data(dataset.nodes)
// 				   .enter()
// 				   .append("circle")
// 				   .attr("r", 10)
// 				   .on("mouseover", function(d){
// 						var xPos = parseFloat(d3.select(this).attr("cx"));
// 						var yPos = parseFloat(d3.select(this).attr("cy")) - 10;
// 						svg2.append("text")
// 							.attr("id", "tooltip")
// 							.attr("x", xPos)
// 							.attr("y", yPos)
// 							.attr("text-anchor", "middle")
// 							.attr("font-family", "sans-serif")
// 							.attr("font-size", "12px")
// 							.attr("font-weight", "bold")
// 							.attr("fill", "black")
// 							.text(d.username);
// 					})
// 				   .on("mouseout", function(){
// 						d3.select("#tooltip").remove();
// 				   })
// 				   .style("fill", function(d, i){
// 				   		return colors(i);
// 				   })
// 				   .call(force.drag);

// 	force.on("tick", function(){

// 		edges.attr("x1", function(d){ return d.source.x; })
// 			 .attr("y1", function(d){ return d.source.y; })
// 			 .attr("x2", function(d){ return d.target.x; })
// 			 .attr("y2", function(d){ return d.target.y; });

// 		nodes.attr("cx", function(d){ return d.x; })
// 			 .attr("cy", function(d){ return d.y; });

// 	});

// });



$(document).ready(function() {
	$("#questions").change(function() {
		// console.log();
		var qId = $(this).val();
		console.log(qId);
		var question = questions[qId];
		question.answers.shift();
	
		d3.select("#visualization svg").remove();

		var w          = 500;
		var h          = 300;
		var padding    = 30;
		var svg = d3.select("#visualization")
					.append("svg")
					.attr("width", w)
		   			.attr("height", h);

		var xScale = d3.scale.ordinal()
					.domain(d3.range(question.answers.length))
					.rangeRoundBands([0, w], 0.05);
		var yScale = d3.scale.linear()
					.domain([0, d3.max(question.answers, function(d){ return d.val; })])
					.range([0, h]);




			/* BAR CHART */
		svg.selectAll("rect")
			.data(question.answers)
			.enter()
			.append("rect")
			.attr("x", function(d, i){
				return xScale(i);
			})
			.attr("y", function(d){
				return h - yScale(d.val);
			})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) {
		   		return yScale(d.val);
			})
			.attr("fill", function(d){
				return "rgb(255, 0, 0)";
			})
			// .on("mouseover", function(d){
			// 	d3.select(this)
			// 		.attr("fill", "orange");
			// })
			// .on("mouseout", function(d){
			// 	d3.select(this)
			// 		.transition()
			// 		.duration(250)
			// 		.attr("fill", function(d){
			// 			return "rgb(" + (d.val * 9) + ", 0, 0)";
			// 		});
			// })
			.on("mouseover", function(d){
				var xPos = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
				var yPos = parseFloat(d3.select(this).attr("y")) + 14;
				svg.append("text")
					.attr("id", "tooltip")
					.attr("x", xPos)
					.attr("y", yPos + 20)
					.attr("text-anchor", "middle")
					.attr("font-family", "sans-serif")
					.attr("font-size", function(d,i){ return xScale(i) * 3; })
					.attr("font-weight", "bold")
					.attr("fill", "white")
					.text(d.val);
			})
			.on("mouseout", function(){
				d3.select("#tooltip").remove();
			})
			.append("title")
			.text(function(d){
				return d.text + "\n (" + d.val + ")";
			});

		svg.selectAll("text")
			.data(question.answers)
			.enter()
			.append("text")
			.text(function(d){
				return d.text;
			})
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
		 	})
		   	.attr("y", function(d) {
		   		return h - yScale(d.val) + 14;
	   	    })
	   	    .attr("width", xScale.rangeBand() + 250)
			.attr("font-family", "sans-serif")
			.attr("font-size", "12px")
			.attr("fill", "black")
			.attr("font-weight", "bold")
			.attr("text-anchor", "middle");



	});
});


}]);
