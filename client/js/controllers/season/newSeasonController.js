angular.module('pelenio').controller('newSeasonController', function($scope, seasonService){	
	$scope.salvarSeason = function(season){
		seasonService.salvarSeason(season);
	}	
});	