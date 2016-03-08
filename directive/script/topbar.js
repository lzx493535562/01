define(["app"],function(app){
	app.directive("lmtopbar",[function(){
		return {
			restrict:"E",
			templateUrl:"../directive/html/topbar.html",
			link:function($scope,$element,$attrs){

			}
		};
	}]);
});