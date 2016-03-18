define(["app",
	'underscore',
	'tool-checker'
	],
	function(app,_){
	app.directive("lmverify",['lmGoodsService',function(goodsService){
		return {
			restrict:"E",
			scope:{},
			templateUrl:"../directive/html/verify.html",
			link:function($scope){
				$scope.serviceDetailStatus = null;
				$scope.barcode = '';


				$scope.pageIndex = 0;
				$scope.pageSize = 8;

				$scope.back = function(){
					$scope.$emit('service.list');
				};

				// 获取order的状态枚举
				$scope.getServiceDetailStatus = function(){
					goodsService.metadata(goodsService.metadataTypeDict.serviceDetailStatus)
					.success(function(data){
						console.log(data);
						var metadata = format(data);
						metadata.unshift({text:'全部',value:''})
						$scope.$broadcast('select.setMetadata',{name:'serviceDetailStatus',data:metadata});
					});
				};


				// 搜索
				$scope.search = _.debounce(function () {
					// this.serviceDetail = function(serviceNumber,classId,status,barcode,pageIndex,pageSize){
					var service = $scope.service;

					var serviceNumber = service.serviceNumber;
					var classId ='';
					var status = $scope.serviceDetailStatus;
					var barcode = $scope.barcode;

					var pageIndex =$scope.pageIndex;
					var pageSize = $scope.pageSize;

					goodsService.serviceDetail(serviceNumber,classId,status,barcode,pageIndex,pageSize)
					.success(function(data){
						$scope.data = data.data;
						$scope.totalCount = data.count;

						console.log('serviceDetail data ->',data);

						$scope.$emit('afterSearch',data);
					})
				},500);

				// 跳到详情板块
				$scope.detail = function(data){
					$scope.$emit('verify.detail',{serviceNumber:$scope.service.serviceNumber,barcode:data.barcode});
				};

				// 审核
				$scope.verify = function(){
					var serviceNumber = $scope.service.serviceNumber;
					var list = [];
					_.each($scope.checkids,function(v,k){
						if(!v) {return;};
						var item = _.find($scope.data,function(n){return n.id == k;});
						list.push({
							barcode:item.barcode,
							status:goodsService.SERVICE_DETAIL_PASS_STATUS
						});
					});

					goodsService.submit(serviceNumber,list)
					.success(function(data,status){
						console.log('after verify',data);
						if(status == 204){
							$scope.search();
						}
					});
				};

				// 监听
				$scope.listen = function(){
					// 设置当前的service
					$scope.$on('serviceDetail.change',function(e,args){
						var service = args;
						$scope.service = service;

						$scope.search();
					});

					// service的状态选择框
					$scope.$on('select.change',function(e,args){
						var name = args.name;
						var data = args.data;

						if(name != 'serviceDetailStatus') {return;};
						$scope.serviceDetailStatus = data;
						console.log('serviceDetailStatus->',$scope.serviceDetailStatus);
					});

					// 页码
					$scope.$on('afterSearch',function(e,args){
						var count = args.count;
						$scope.pageCount = Math.floor((count + ($scope.pageSize - 1)) / $scope.pageSize);
					});

					// checker
					$scope.$on('afterSearch',function(e,args){
						var ids = _.map(args.data,function(n){return n.id;});
						$scope.$emit('checker.setMetadata',ids);
					});
				};

				function format(data){
					return _.map(data,function(n){
						return {
							text:n.value,
							value:n.resid
						};
					});
				};

				$scope.listen();

				$scope.getServiceDetailStatus();
			}
		};
	}]);
});