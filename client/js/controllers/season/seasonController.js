angular.module('pelenio').controller('seasonController', function($scope, temporadas){
	$scope.temporadas = temporadas.data;	
});
