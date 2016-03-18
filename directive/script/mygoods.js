define([
	"app",
	'service-goods',
	'service-img',
	'filter-goodsType'
	],function(app){
	app.directive('lmmygoods',['lmGoodsService','lmImgService',function(goodsService,imgService){
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

				

				$scope.listen = function(){
					$scope.$on('pageIndexChanged',function(e,args){
						$scope.search();
					});

					// 搜索之后,调整页码
					$scope.$on('afterSearch',function(e,args){
						var data = args;
						$scope.pageCount = Math.floor((data.count + ($scope.pageSize - 1)) / $scope.pageSize);
					});

					// checker
					$scope.$on('afterSearch',function(e,args){
						var ids = _.map(args.data,function(n){return n.goodsId;});
						$scope.$emit('checker.setMetadata',ids);
					});
				};

				// 下载
				$scope.down = function(idList){
					idList = _.isArray(idList) ? idList : [idList];
					if(idList.length==0){return;}
					var list = _.map(idList,function(id){
						var item = _.find($scope.data,function(n){return n.goodsId == id;});
						var skuId = item.sku_id;
						var barcode = item.barcode;
						return {skuId:skuId,code:barcode};
					});
					imgService.getZipPro(list);
				};

				// 选择下载
				$scope.downChoose = function(){
					var idList = [];
					_.each($scope.checkids,function(v,k){
						v && idList.push(k);
					});
					$scope.down(idList);
				};

				// 初始化csv上传控件
				$scope.initCsvUploader = function() {
					$('.csvUploader').change(function() {
						var file = $(this)[0].files[0];
						if (/\.csv$/.test(file.name)) {
							var reader = new FileReader();

							reader.onload = function(e) {
								var content = this.result;
								var data = content.split('\n').slice(1);

								data = _.filter(data, function(n) {
									return /^\d+$/.test(n - 0) && n.replace(/\s/g, '') + '' != '';
								});
								data = _.map(data, function(n) {
									return (n + '').replace('\r', '');
								});

								$scope.batchSearch(data);
							};

							//读取文件内容  
							reader.readAsText(file);
						} else {
							alert("只支持csv格式文件上传!");
						}
					});
				};

				// 批量搜索
				$scope.batchSearch = function(data){
					console.log('csv data',data);
				};



				$scope.listen();

				$scope.initCsvUploader();

				$scope.search();
			}
		};
	}]);
});