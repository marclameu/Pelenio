angular.module('pelenio').config(function($httpProvider){
	$httpProvider.interceptors.push("loadingInterceptor");
	$httpProvider.interceptors.push("autenticationInterceptor");	
}); 