angular.module('pelenio').controller('fecharSeasonController', function($scope, seasonService){
	$scope.fecharSeason = function(temporada){
		console.log(temporada);
	}
});