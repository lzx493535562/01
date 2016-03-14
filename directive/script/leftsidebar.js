define(["app"],function(app){
	app.directive("lmleftsidebar",[function(){
		return {
			restrice:"E",
			templateUrl:"../directive/html/leftsidebar.html",
			link:function($scope,$element,$attrs){
				$scope.currName = $attrs.menuName;
				$scope.menuData = [
					{name:'我的商品库',url:'mygoodspage'},
					{name:'共享数据',url:'categorydatapage'}
				];

				$scope.linkTo = function(menuName){
					// var menu = _.find($scope.menuData,function(menu){return menu.name == })
				};

				$scope.sidebarHeight = window.innerHeight-80;
			}
		}
	}]);
});