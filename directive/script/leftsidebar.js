define(["app"],function(app){
	app.directive("lmleftsidebar",[function(){
		return {
			restrice:"E",
			templateUrl:"../directive/html/leftsidebar.html",
			link:function($scope,$element,$attrs){
				$scope.sidebarHeight = window.innerHeight-80;
			}
		}
	}]);
});