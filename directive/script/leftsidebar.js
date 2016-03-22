define(["app"],function(app){
	app.directive("lmleftsidebar",['$window',function($window){
		return {
			restrice:"E",
			templateUrl:"../directive/html/leftsidebar.html",
			link:function($scope,$element,$attrs){
				$scope.currName = $attrs.menuName;
				$scope.menuData = [
					{name:'数据中心',url:'categorydatapage'},
					{name:'我的商品库',url:'mygoodspage'}
				];

				$window.onresize = _.debounce(function(){
					$scope.sidebarHeight = $window.innerHeight-80;
					$scope.$apply();
				},200);
				$($window).trigger('resize');
			}
		}
	}]);
});