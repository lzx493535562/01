define(["app",
	'underscore',
	'service-goods',
	'tool-checker'
	],function(app,_){
	app.directive("lmshopcart",['lmGoodsService',function(goodsService){
		return {
			restrict:"E",
			templateUrl:"../directive/html/shopcart.html",
			link:function($scope,$element,$attrs){
				$scope.pageIndex = 0;
				$scope.pageSize = 2;

				$scope.selectedCount = 0;

				// 搜索
				$scope.search = function(){
					var pageIndex = $scope.pageIndex;
					var pageSize = $scope.pageSize;

					goodsService.shopcart(pageIndex,pageSize)
					.success(function(data){
						$scope.data = data.data;
						$scope.totalCount = data.count;

						$scope.$emit('shopcart.afterSearch',data);
					});
				};

				// 获取更多
				// 在元数据上加载(其实是让pageSize*2)
				$scope.more = function(){
					$scope.pageSize *=2;
					$scope.search();
				};

				// 删除
				// list<{goodsId,db}>
				$scope.remove = function(list){
					// 如果不写list,则表示删除所有选择的项
					if(list === undefined){
						list = [];
						_.each($scope.checkids,function(v,k){
							if(!v){return;};

							var item = _.find($scope.data,function(n){return n.goodsId == k;});
							list.push({goodsId:item.goodsId,db:item.db});
						});
					}

					goodsService.shopcartRemove(list)
					.success(function(data,status){
						if(status == 204){
							console.log('remove success');
							$scope.$emit('shopcart.afterRemove',data);
						}
					});
				};


				// 结算
				$scope.confirm = function(){

				};

				$scope.listen = function(){
					// 删除之后,要刷新页面
					$scope.$on('shopcart.afterRemove',function(){
						$scope.pageSize = 8;
						$scope.search();
					});

					// 搜索之后,要更新checkids
					$scope.$on('shopcart.afterSearch',function(e,args){
						var data = args.data;
						var count = args.count;

						var last = $scope.checkids || {};
						$scope.checkids = {};
						_.each(data,function(d){
							$scope.checkids[d.goodsId] = last[d.goodsId] || false;
						});

						// 这里需要重新核实
						$scope.isAllChecked = $scope.count && _.all($scope.checkids,function(v,k){return v;});
					});

					// watch
					$scope.$watch('checkids',function(nv,ov){
						$scope.selectedCount = 0 ;
						$scope.selectedPrice = 0;

						_.each(nv,function(v,k){
							if(v){
								$scope.selectedCount++;

								var item = _.find($scope.data,function(n){return n.goodsId == k;}) ;
								$scope.selectedPrice += item.price;
							}
						});
					},true);
				};

				$scope.listen();

				$scope.search();

			}
		}
	}]);
});