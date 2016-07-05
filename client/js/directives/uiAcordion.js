angular.module("pelenio").directive("uiAccordions", function(){
	return{
		controller: function($scope, $element, $attrs){
			var accordions = [];

			this.registerAccordion = function(accordion){
				accordions.push(accordion);
			};

			this.closeAll = function (){
				accordions.forEach(function(accordion){
					accordion.isOpened = false;
				});
			};
		}
	};
});
angular.module("pelenio").directive("uiAccordion", function(){
	return{
		template: "<div class='ui-accordion-title' ng-click='openClose()'><center><h4><a href=''>{{title}}</a></h4></center></div><div class='ui-accordion-content' ng-show='isOpened' ng-transclude ></div>",
		transclude: true,
		scope: {
			title: "@"
		},
		require: "^uiAccordions",  //^ usado para prefixar o elemendo pai.
		link: function(scope, element, attrs, ctrl){
			ctrl.registerAccordion(scope);			
			scope.openClose = function(){
				ctrl.closeAll();
				scope.isOpened = !scope.isOpened;
			}
		}
	};
});