define([
	"app",
	'service-goods',
	'filter-goodstype'
	],function(app){
	app.directive('lmmygoods',['lmGoodsService',function(goodsService){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			 templateUrl: '../directive/html/mygoods.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope,$element,$attrs) {
				// 
				$scope.data = null;
				
				$scope.pageIndex = 0;
				$scope.pageSize = 1;

				// 被选择的商品的id字典
				$scope.checkids = {};
				// 是否全选
				$scope.isAllChecked = false;

				// 搜索
				$scope.search = function(){
					var barcode = $scope.barcode,
						name = $scope.keyword,
						type = $scope.type;
					var pageIndex = $scope.pageIndex,
						pageSize = $scope.pageSize;

					goodsService.goods(barcode,name,type,pageIndex,pageSize).
					success(function(data){
						$scope.data = data.data;
						$scope.totalCount = data.count;
						$scope.$emit('afterSearch',data);

						
					});
				};

				// 选择商品
				$scope.check = function(id){
					$scope.checkids[id] = !$scope.checkids[id];
					var totalCount = _.size($scope.data);
					var checkedCount =  _.size(_.filter($scope.checkids,function(v){return v}));
					$scope.isAllChecked = checkedCount == totalCount && checkedCount != 0;
				};

				// 全选
				$scope.checkAll = function(){
					var flag = $scope.isAllChecked = !$scope.isAllChecked;
					_.each($scope.data,function(d){
						$scope.checkids[d.id] = flag;
					});
				};

				// 向前翻页
				$scope.pagePrev = function(){
					if($scope.pageIndex == 0){
						return;
					}
					$scope.pageIndex --;
					$scope.$emit('pageIndexChanged',$scope.pageIndex);
				};

				// 向后翻页
				$scope.pageNext = function(){
					if($scope.pageIndex == $scope.pageCount-1){
						return;
					}
					$scope.pageIndex ++;
					$scope.$emit('pageIndexChanged',$scope.pageIndex);
				};

				$scope.listen = function(){
					$scope.$on('pageIndexChanged',function(e,args){
						$scope.search();
					});

					// 搜索之后,调整页码
					$scope.$on('afterSearch',function(e,args){
						var data = args;
						$scope.pageCount = Math.floor(($scope.totalCount + ($scope.pageSize - 1)) / $scope.pageSize);
					});

					// 搜索之后,取消所有选择(checkbox)
					$scope.$on('afterSearch',function(e,args){
						var data = args;
						$scope.isAllChecked = false;
						_.each($scope.checkids,function(v,k){
							delete $scope.checkids[k];
						});
					});
				};

				$scope.listen();

				$scope.search();
			}
		};
	}]);
});