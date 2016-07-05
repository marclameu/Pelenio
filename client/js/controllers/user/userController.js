angular.module("pelenio").controller("userController", function($scope, usuarios){
	$scope.message = "Hello world!!!";
	$scope.usuarios = usuarios.data;	
});