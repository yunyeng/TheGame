var app = angular.module("app", ["ngRoute", "localytics.directives"]);
app.controller("HomeCtrl", ["$scope", "$http", function($scope, $http){

$scope.questTexts = {};

$http.get("/questions").success(function(res){
	// $scope.questions = res;
	// console.log(res)
	for(var i=0;i<res.length;i++){
		for(var j=0; j<res[i].questions.length; j++){
			if($scope.questTexts[res[i].questions[j].id] == undefined){
				$scope.questTexts[res[i].questions[j].id] = res[i].questions[j];
			}
		}
	}
});

}]);
