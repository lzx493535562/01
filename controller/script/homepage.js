define(["app",
		"directive-topbar",
		"directive-home"
	],function(app){
	app.controller("lmHomepageCtrl",["$scope","$rootScope",function($scope,$rootScope){
		$rootScope.isLogin = false;
	}]);
});