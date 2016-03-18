define(["app",
		"service-goods",
		"service-img"
	],function(app){
	app.directive("lmverifydetail",["lmGoodsService","lmImgService",function(goodsService,imgService){
		return {
			restrict:"E",
			templateUrl:"../directive/html/verifydetail.html",
			link:function($scope,$element,$attrs){

				$scope.getDetail = function(cb){
					//var goodsId = $routeParams.goodsId;
					var serviceNumber = 20160315000001;
					var barcode = 3014400022637;
					goodsService.verifydetail(serviceNumber,barcode)
					.success(function(data){
						$scope.data = data;
						console.log("detail",data);
						cb && cb();
					})
				};
			

				$scope.getPics = function(){
					var code = $scope.data.sku_id;
					var xType = 2;
					imgService.getPics(code,xType,function(err,data){
						$scope.imgData = data;
						console.log("img",data);

						var _getFullurl = function(d){
								return imgService.getFullurl(d.domain+"/"+d.key,100);
							};

						$scope.pics_main = _.map(data["1"],_getFullurl);
						$scope.pics_detail = _.map(data["2"],_getFullurl);
						$scope.pics_tag = _.map(data["3"],_getFullurl);
						$scope.pics_box = _.map(data["4"],_getFullurl);
						
						$scope.$apply();
					});
				};

				//
				$scope.getThumb = function(){
					var skuId = $scope.data.sku_id;
					imgService.getThumb([skuId],function(err,data){
						if(data[0]){
							var bigimgData = imgService.getFullurl(data[0].domain+"/"+data[0].key,500);
							$scope.setBigimg(bigimgData);
							console.log("bigimg",$scope.bigimg);
							$scope.$apply();
						}
					})
				};

				//点击小图变成大图
				$scope.setBigimg = function(data){
					$scope.currBigimg = data.replace(/\d+$/,'');
					data = data.replace(/\d+$/,"500");
					$scope.bigimg = data;
				};

				
				/*{
			    "access_token": "用户访问凭证",
			    "param": [
			        {
			            "barcode": "条形码过滤",
			            "status": "状态 metaData.type:8",
			            "rejectType": "如果是驳回,原因 metaData.type:5",
			            "rejectContent": "驳回详情"
			        }
			    ]
			}*/	

				$scope.$on('verify.detail',function(e,args){
					$scope.serviceNumber = args.serviceNumber;
					$scope.barcode = args.barcode;
				});
				//通过
				$scope.through = function(serviceNumber){
					//var barcode = 3014400022637;
					var status = 8;
					var rejectType = 3;
					var rejectContent = null;
					goodsService.verify($scope.serviceNumber,[{barcode:$scope.barcode,status:status,rejectType:rejectType,rejectContent:rejectContent}])
					.success(function(data){
						console.log("通过data",data);
					})
				};


				//驳回
				$scope.rejected = function(serviceNumber){
					//var barcode = 3014400022637;
					var status = 8;
					var rejectType = 4;
					var rejectContent = "222";
					goodsService.verify($scope.serviceNumber,[{barcode:$scope.barcode,status:status,rejectType:rejectType,rejectContent:rejectContent}])
					.success(function(data){
						console.log("驳回data",data);
						$scope.rejectedBox = true;
					})
				};

				//隐藏驳回悬浮框
				$scope.closeRejected = function(){
					$scope.rejectedbox = false;
				};

				$scope.getDetail(function(){
					$scope.getThumb();				
					$scope.getPics();
				});
			}
		}
	}]);
});