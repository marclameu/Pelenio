angular.module('pelenio').config(function($httpProvider){
	$httpProvider.interceptors.push("autenticationInterceptor");
}); 