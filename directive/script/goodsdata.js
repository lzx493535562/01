define(["app",
	"underscore",
	"cookie",
	"async",
	// "directive-popupaddgoods",
	// "directive-popuplogin",
	"service-util"
	],function(app,_,cookie,async){
	app.directive("lmgoodsdata",[
		"$rootScope",
		"$location",
		"$routeParams",
		"lmImgService",
		"lmUserService",
		"lmUtilService",
		"lmGoodsService",
		function($rootScope,$location, $routeParams,imgService,userService,utilService,goodsService){
			return {
				restrict:"E",
				templateUrl:"../directive/html/goodsdata.html",
				link:function($scope,$element){
					$scope.currPage = 0;
					$scope.pageCount = 0;
					$scope.checkids = [] ;
					$scope.params = JSON.parse($routeParams.params || "{}");
					$scope.data = {};
					
					$scope.getThumbList = function(sourceData,next){
						var codelist = _.map(sourceData,function(n){return n.sku_id;});

		 				if(codelist && codelist.length>0){
			 				imgService.getThumb(codelist,function(err,data){
			 					if(data){
			 						_.each(data,function(n,i){
			 							sourceData[i].pic = n ? imgService.getFullurl(n.domain+"/"+n.key,500) : null;
			 						});
				 					$scope.$apply();
				 					next && next();
			 					}
			 				});
		 				}
		 			};

					$scope.linkToDetail = function(id){
						utilService.linkTo("/productdetail/"+id,true);
					};

					
					//进入二级分类
					$scope.toCategory = function(c){
						var id = c.id;
						/*var params = {type_id:c.id};
						$scope.searchCate(params);*/
						$location.path("/categorydata/"+id);
					};


					//获取分类
					$scope.renderData = function(){
						$scope.getCategory(function(){
							_.each($scope.categoryData,function(cate){
								$scope.getGoodsByCategory(cate);
							});
						});
					};

					// 获取所有分类 
					$scope.getCategory = function(next){
						goodsService.category()
						.success(function(data){
							$scope.categoryData = categoryData(data);
							next && next();
						});
					};

					// 根据某个分类来
					$scope.getGoodsByCategory = function(category){
						var opts = {
							access_token:userService.token(),
							level:1,
							catId:category.id,
							page:0,
							count:10
						};
						goodsService.goodlist(opts)
						.success(function(data){
							var sourceData = format(data.data);
							$scope.data[category.id] = sourceData;
							$scope.getThumbList(sourceData);
						});
					};

					$scope.renderData(function(){
					});

					

					

					//更多分类
					$scope.seeMore =function(){
						$scope.isShowSeemore = true;
						$scope.isMoreHeight = true;
					};
					$scope.hideMore =function(){
						$scope.isShowSeemore = false;
						$scope.isMoreHeight = false;;
					};
					
				}
			};

			// format
			function format(data){
				data = _.map(data,function(n){
					return {
						id:n.id,
						code:n.barcode,
						name:n.name,
						brand:n.brand,
						producePlace:n.address,
						exists:n.exists,
						sku_id:n.sku_id,
						refer:n.refer
					};
				});
				return data;
			};

			function categoryData(data){
				return _.map(data,function(n){
					return {
						id:n.id,
						code:n.code,
						type:n.value,
						subType:_.map(n.subset,function(n){
							return {
								id:n.id,
								code:n.code,
								type:n.value
							};
						})
					};
				});
			}


	}]);

});