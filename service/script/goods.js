define([
		'app',
		'service-user'
	],function(app){
		app.service('lmGoodsService', ['$http','lmUserService',function($http,userService){
			var urlPrefix = 'http://192.168.1.240:88';
			var urlDict = {
				goods:'/lingmall/my/goods',
				detail:'/lingmall/my/goods/{id}',
				verify:'lingmall/my/verify',
				progress:'/lingmall/my/verify/progress/{batchNumber}',
				info:'/lingmall/my/verify/info/{batchNumber}',
				infoPro:'/lingmall/my/verify/info/{batchNumber}/{barcode}',
				submit:'/lingmall/my/verify/submit/{batchNumber}'
			};
			var methodDict = {
				post:'POST',
				get:'GET'
			};

			// 我的商品库
			this.goods = function(barcode,name,type,pageIndex,pageSize){
				return $http({
					url:urlDict.goods,
					method:methodDict.post,
					data:{
						access_token:userService.token(),
						barcode:barcode,
						name:name,
						type:type,
						page:pageIndex-0+1,
						count:pageSize
					}
				});
			};

			// 我的商品详情
			this.detail = function(id){
				return $http({
					url:urlDict.detail.replace('{id}',id),
					method:methodDict.post,
					data:{
						access_token:userService.token()
					}
				});
			};

			// 查询审核
			this.verify = function(startTime,endTime,status){
				return $http({
					url:urlDict.verify,
					method:methodDict.post,
					data:{
						access_token:userService.token(),
						startTime:startTime,
						endTime:endTime,
						status:status
					}
				});
			};


			// 查询审核的进度
			this.progress = function(batchNumber){
				return $http({
					url:urlDict.progress.replace('{batchNumber}',batchNumber),
					method:methodDict.post,
					data:{
						access_token:userService.token()
					}
				});
			};

			// 查询审核的批次详情
			this.info = function(batchNumber,type,status,barcode){
				return $http({
					url:urlDict.info.replace('{batchNumber}',batchNumber),
					method:methodDict.post,
					data:{
						access_token:userService.token(),
						type:type,
						status:status,
						barcode:barcode
					}
				});
			};

			// 查询审核的批次的条码详情
			this.info2 = function(batchNumber,barcode){
				return $http({
					url:urlDict.info2.replace('{batchNumber}',batchNumber).replace('{barcode}',barcode),
					method:methodDict.post,
					data:{
						access_token:userService.token()
					}
				});
			};

			// 调教审核信息
			this.submit = function(batchNumber,barcode,status,rejectType,rejectContent){
				return $http({
					url:urlDict.submit.replace('{batchNumber}',batchNumber),
					method:methodDict.post,
					data:{
						access_token:userService.token(),
						barcode:barcode,
						status:status,
						rejectType:rejectType,
						rejectContent:rejectContent
					}
				});
			};

		}]);
	}
);)