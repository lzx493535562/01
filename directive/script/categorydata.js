define(["app",
	"underscore",
	'async',
	"cookie",
	"service-img",
	"directive-shopcartbtn",
	"directive-minpager",
	"directive-pager",
	/*"directive-popuplogin",
	"directive-popupbuy",*/
	"service-util",
	'directive-select',
	'directive-catebar',
	'tool-checker',
	"directive-modal"
	],function(app,_,async,cookie){
	app.directive("lmcategorydata",[
		// "$rootScope",
		// "$routeParams",
		// "$scope",
		"lmImgService",
		// "lmUserService",
		// "lmUtilService",
		"lmGoodsService",
		function(/*$rootScope,$routeParams,$scope,imgService,userService,utilService,*/imgService,goodsService){
			return {
				restrict:"E",
				templateUrl:"../directive/html/categorydata.html",
				link:function($scope,$element,$attrs){
					// 分类 
					$scope.category = null;
					$scope.pageIndex = 0;
					$scope.pageSize = 8;
					$scope.data = null;
					// 被选择的"二级"分类的"值"
					$scope.selectedCategory = null;
					// 搜索出来的总数
					$scope.totalCount = null;

					// 被选择的商品的id字典
					$scope.checkids = {};
					// 是否全选
					$scope.isAllChecked = false;

					// 获取一级分类
					$scope.getCategory = function(cb){
						goodsService.category().
						success(function(data){
							console.log(data);
							$scope.category = data.data;
							cb && cb();
						});
					};

					// // 获取二级分类
					// $scope.getSubTypes = _.debounce(function(cb){
					// 	goodsService.subCategory($scope.subCateId)
					// 	.success(function(data){
					// 		$scope.subTypes = data;
					// 		console.log(data);
					// 		cb && cb();
					// 	});
					// },200);

					// 搜索
					$scope.search = function(){
						var level = 2;
						var catId = $scope.selectedCategory;
						var pageIndex = $scope.pageIndex;
						var pageSize = $scope.pageSize;

						goodsService.goodlist(level,catId,pageIndex,pageSize)
						.success(function(data){
							$scope.data = data.data;
							$scope.totalCount =data.count;
							console.log(data);

							$scope.$emit('afterSearch',data);
						});
					};

					$scope.listen = function(){
						$scope.$on('select.change',function(e,args){
							var name = args.name;
							var value = args.data;

							if(name=='category'){
								var item = _.find($scope.category,function(n){return n.id == value;});
								var data = formatCategory(item.subset);
								var title = item.value;
								$scope.$broadcast('catebar.setMetadata',{name:'category',title:title,data:data});
							}

						});

						$scope.$on('catebar.change',function(e,args){
							var name = args.name;
							var selectedCategory = args.data;

							if(name=='category'){
								console.log('selectedCategory',selectedCategory);
								$scope.selectedCategory = selectedCategory[0].value;
								$scope.search();
							}
						});

						// 获取图片
						$scope.$on('afterSearch',function(e,args){
							var data = args.data;
							var skuidList = _.map(data,function(n){return n.sku_id;});
							imgService.getThumb(skuidList,function(err,parturlList){
								_.each(data,function(n,i){
									n.img = parturlList[i]?imgService.getFullurl([parturlList[i].domain,parturlList[i].key].join('/'),500):null;
								});
								$scope.$apply();
							});
						});

						// checker
						$scope.$on('afterSearch',function(e,args){
							var ids = _.map(args.data,function(n){return n.goodsId;});
							$scope.$emit('checker.setMetadata',ids);
						});	
					};

					$scope.listen();

					$scope.getCategory(function(){
						var data = formatCategory($scope.category);
						$scope.$broadcast('select.setMetadata',{name:'category',data:data});
					});
					
					// 格式化category的信息
					// 使之成为{text:..,value:..}格式
					function formatCategory(data){
						return _.map(data,function(n){
							return {
								value:n.id,
								text:n.value
							};
						});
					};
				}
			};


		}]);
});