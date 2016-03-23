define(["app"],function(app){
	app.directive("lmheadbar",['$rootScope',function($rootScope){
		return {
			restrice:"E",
			templateUrl:"../directive/html/headbar.html",
			link:function($scope,$element,$attrs){
				$rootScope.isLogin = false;
			}
		}
	}]);
});