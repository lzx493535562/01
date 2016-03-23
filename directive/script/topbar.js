define(["app"],function(app){
	app.directive("lmtopbar",["lmUtilService","$rootScope",function(utilService,$rootScope){
		return {
			restrict:"E",
			templateUrl:"../directive/html/topbar.html",
			link:function($scope,$element,$attrs){

				$rootScope.isLogin = true;

				$scope.title = $attrs.lmAttrTitle;

				$scope.linkTo = function(path,flag){
					utilService.linkTo(path,flag === undefined ? false : $location.path()=='/');
				};


			}
		};
	}]);
});