define(["app"],function(app){
	app.directive("lmleftsidebar",[function(){
		return {
			restrice:"E",
			templateUrl:"../directive/html/leftsidebar.html",
			link:function($scope,$element,$attrs){
				$scope.menuData = [
					{name:'我的商品库',url:'mygoodspage'},
					{name:'定制化服务',children:[
						{name:'服务状态',url:''},
						{name:'服务订购',url:''}
					]},
					{name:'共享数据',children:[
						{name:'商品数据',url:''},
						{name:'商品数据',url:''},
					]},
					{name:'订单管理',children:[],url:''},
				];

				$scope.linkTo = function(menuName){
					// var menu = _.find($scope.menuData,function(menu){return menu.name == })
				};

				$scope.sidebarHeight = window.innerHeight-80;
			}
		}
	}]);
});