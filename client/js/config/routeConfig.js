angular.module("pelenio").config(function($routeProvider){
	$routeProvider
	.when("/users", {
		templateUrl: "view/users/users.html",
		controller: "userController",
		resolve: {
			usuarios: function(userService){
				return userService.getUsuarios();
			}
		}		
	})
	.when("/novoUsuario", {
		templateUrl: "view/users/newUser.html",
		controller: "newUserController"	
	})	
});

