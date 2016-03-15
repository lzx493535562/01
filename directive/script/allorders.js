define(["app",'service-goods','dataJs'],function(app){
	app.directive("lmallorders",['lmGoodsService',function(goodsService){
		return {
			restrict:"E",
			templateUrl:"../directive/html/allorders.html",
			link:function($scope,$elememt,$attrs){
				var today = Date.today();
				$scope.startTime = today.addDays(-7);
				$scope.endTime = today;
				$scope.status = 1;

				$scope.pageIndex = 0;
				$scope.pageSize = 8;

				// 搜索
				var searchDelay = 500;
				$scope.search = _.debounce(function(){
					var startTime = $scope.startTime.format('Y-m-d');
					var endTime = $scope.endTime.format('Y-m-d');
					var status = $scope.status;

					var pageIndex = $scope.pageIndex,
					pageSize = $scope.pageSize;
					
					goodsService.verify(startTime,endTime,status,pageIndex,pageSize)
					.success(function(data){
						$scope.data = data.data;
						$scope.totalCount = data.count;
						$scope.$emit('afterSearch',data);
					});
				},searchDelay);

				$scope.listen = function(){
					$scope.$on('pageIndexChanged',function(e,args){
						$scope.search();
					});

					// 搜索之后,调整页码
					$scope.$on('afterSearch',function(e,args){
						var data = args;
						$scope.pageCount = Math.floor(($scope.totalCount + ($scope.pageSize - 1)) / $scope.pageSize);
					});
				};

				$scope.listen();

				$scope.search();
			}
		}
	}]);
});