angular.module('pelenio').controller('homeController', function($scope){
	$scope.loaded = function() {		
    	$('#side-menu').metisMenu();
	}	
});