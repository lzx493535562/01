define(["app",
	"underscore",
	"cookie",
	"service-img",
	// "directive-popupaddgoods",
	"directive-pager",
	/*"directive-popuplogin",
	"directive-popupbuy",*/
	"service-util",
	"directive-modal"
	],function(app,_,cookie){
	app.directive("lmcategorydata",function(){
		return {
			restrict:"E",
			templateUrl:"../directive/html/categorydata.html",
			controller:["$rootScope",
			"$routeParams",
			"$scope",
			"lmImgService",
			"lmUserService",
			"lmUtilService",
			"lmGoodsService",
				function($rootScope,$routeParams,$scope,imgService,userService,utilService,goodsService){
					$scope.pageCount = 0;
					//获取分类
					$scope.currCategoryIndex = 0;
					$scope.currSubcategoryIndex = 0;

					$scope.setCurrSubcategoryIndex = function(index){
						$scope.currSubcategoryIndex = index;
						$scope.currPage  = 0;
						$scope.checkIds = [];
						// to do
						// search
					};

					$scope.setCurrCategoryIndex = function(index){
						$scope.currCategoryIndex = index;
						$scope.currSubcategoryIndex = 0;
					};

					//显示更多分类
					$scope.seeMore = function(){
						$scope.isShowSeemore = true;
						$scope.isMoreHeight = true;
					};
					$scope.hideMore = function(){
						$scope.isShowSeemore = false;
						$scope.isMoreHeight = false;
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
					};

					function format(data){
						data = _.map(data,function(n){
							return {
								id:n.id,
							    code:n.sku_id,
							    name:n.name,
							    brand:n.brand,
							    producePlace:n.address,
							    exists:n.exists,
							    refer:n.refer
							};
						});
						return data;
					};

					//获取所有分类
					$scope.getCategory = function(next){
						goodsService.category()
						.success(function(data){
							$scope.categoryData = categoryData(data);
							next&&next();
							 var currCategoryIndex = _.findIndex($scope.categoryData,function(n){return n.id == $scope.categoryId;});
							 $scope.setCurrCategoryIndex(currCategoryIndex);
							$scope.search();
						})
					};
					//$scope.getCategory();

					var _search = function(){
						var pageIndex = $scope.currPage;
						var pageSize = 8;
						if(!$scope.categoryData){
							return;
						}
						var currCategory = $scope.categoryData[$scope.currCategoryIndex];
						var typeId = currCategory.subType[$scope.currSubcategoryIndex].id;
						var catId = $scope.categoryData[$scope.currCategoryIndex].subType[$scope.currSubcategoryIndex].id;
						var opts = {
							level:2,
							catId:catId,
							page:pageIndex-0+1,
							count:8
						};
						var opts = _.extend(opts,$scope.params);
						//console.log("opts",opts);
						goodsService.goodlist(opts)
						.success(function(data){
							$scope.data = data.data;
							var itemCount = data.count;
							$scope.pageCount = Math.floor((itemCount+(pageSize-1)) / pageSize);
							$scope.itemCount = itemCount;
							// 取缩略图
							var codelist = _.map($scope.data,function(n){return n.sku_id;});
							$scope.getThumbList(typeId,codelist);
						});
					};

		 			$scope.getThumbList = function(typeId,codelist){
		 				if(codelist && codelist.length>0){
			 				imgService.getThumb(codelist,function(err,data){
			 					if(data && typeId == $scope.categoryData[$scope.currCategoryIndex].subType[$scope.currSubcategoryIndex].id){
			 						_.each(data,function(n,i){
			 							$scope.data[i].pic = n ? imgService.getFullurl(n.domain+'/'+n.key,500) : null;
			 						});
				 					$scope.$apply();
			 					}
			 				});
		 				}
		 			};

					$scope.search = _.debounce(_search,100);

					$scope.showCheckbox = function(id){
						$scope.currHoverId = id;
						//console.log(">>>>>>>>>>>>>>>>>>>",id);
					};
					$scope.hideCheckbox = function(id){
						$scope.currHoverId = null;
						
					};

					$scope.checkIds = [];
					$scope.isCheckAll = false;
					$scope.checkId = function(id){
						if(id=="all"){
							if($scope.checkIds.length == $scope.data.length && $scope.checkIds.length!=0){
								$scope.checkIds = [];
							}else{
								$scope.checkIds = _.map($scope.data,function(n){return n.id;});
							}
						}else{
							if($scope.checkIds.indexOf(id)>=0){
								$scope.checkIds = _.without($scope.checkIds,id);
							}else{
								$scope.checkIds.push(id);
							}
						}
						
					};

					$scope.$watch("checkIds.length",function(nv){
						// console.log("nv",nv);
						$scope.isCheckAll = !!(nv!=0 && nv == $scope.data.length);
					
						var list = _.filter($scope.data,function(d){return _.find($scope.checkIds,function(ci){ return ci==d.id;});})
						$scope.canBatchAddGood = !!_.find(list,function(d){return d.exists == 1;});
						$scope.canBatchAddRequire = !!_.find(list,function(d){return d.exists == 0;});
					});

					$scope.$watch("currCategoryIndex",function(){
						$scope.search();
					});

					$scope.$watch("currSubcategoryIndex",function(){
						$scope.search();
					});


					//点击左右箭头 上下翻页
					function setCurrPage(index){
						return Math.max(Math.min($scope.pageCount-1,index),0);
					};
					// 前后翻页
					$scope.pagePrev = function(){
						$scope.currPage = setCurrPage($scope.currPage-1);
						$scope.search();
					};
					$scope.pageNext = function(){
						$scope.currPage = setCurrPage($scope.currPage+1);
						$scope.search();
					};


					//addgoods
						var _addMygood = function(idList){
							_.each(idList,function(ci){
								var d = _.find($scope.data,function(n){return n.id == ci;});
								d.exists = 2;
								var db = _.find($scope.data,function(n){return n.id == ci}).db;
								//console.log("dbdbdbddbd",db);
								goodsService.addGoods([{id:d.id,db:db}])
								.success(function(data){
									console.log(data);
									//$scope.exists = 2;
									$scope.$broadcast('toggleModal',{name:'buy',flag:true,updateInfo:{buyFlag:true}});
									var idList = _.map(idList,function(id){ return _.find($scope.data,function(n){return n.id==id;}).id; });
									$scope.checkIds = _.filter($scope.checkIds,function(ci){return !_.find(idList,function(n){return n==ci;});});
								})
								.error(function(err,code){
									if(code==401||code==412){
										$scope.$broadcast('toggleModal',{name:'login',flag:true});
									}
								});
							});
						};

						//未登录时,全部显示为"加入商品库"
						$rootScope.$watch("isLogin",function(newValue){
							//console.log("$watch");
						});

						$scope.batchAddMygood = function(){
							var list =_.filter($scope.data,function(d){return $scope.checkIds.indexOf(d.id)>=0 && d.exists==1;});
							var idList = _.map($scope.checkIds,function(id){ return _.find($scope.data,function(n){return n.id==id;}).id});
							_addMygood(idList);
					};

					$scope.$watch("pageCount",function(){
						$scope.$broadcast("changePageCountOfCategorydata",{pageCount:$scope.pageCount});
					});
					$scope.$on("changeCurrPageOfCategorydata",function(e,args){
						var currPage = args.currPage;
						if($scope.currPage!=currPage){
							//console.log("currPage changed!",$scope.currPage+" -> "+currPage);
							$scope.currPage = currPage;
							$scope.search();
						};
					});

					$scope.linkToDetail = function(id){
						var item = _.find($scope.data,function(n){return n.id == id;});
						utilService.linkTo("/productdetail/"+[id,item.db].join(","),true);
					};
				}
			] ,
			link:function($scope,$element,$attrs){
				//加入商品库按钮
				$scope.canBatchAddGood = false;
				$scope.categoryId = $attrs.categoryId;
			}
		};


	});
});