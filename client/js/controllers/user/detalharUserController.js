angular.module('pelenio').controller('detalharUserController', function($scope, usuario){
	$scope.usuario = usuario.data[0];	
});