angular.module("pelenio").controller("userController", function($scope, userService){
	$scope.message = "Hello world!!!";		
	userService.getUsuarios().success(function(response){
		$scope.usuarios = response;
		console.log(response);
	});
});