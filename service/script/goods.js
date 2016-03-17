define([
		'app',
		'service-user'
	],function(app){
		app.service('lmGoodsService', ['$http','lmUserService',function($http,userService){
			var urlPrefix = 'http://192.168.1.240:8001';
			var urlDict = {
				metadata:'/lingmall/metadata/{type}',
				category:'/lingmall/category',
				goodslist:'/lingmall/goods/list',
				category:'/lingmall/category',
				subCategory:'/lingmall/category/{id}',
				// my
				goods:'/lingmall/my/goods',
				detail:'/lingmall/my/goods/{id}',
				service:'/lingmall/my/service',
				progress:'/lingmall/my/service/progress/{batchNumber}',
				info:'/lingmall/my/service/info/{batchNumber}',
				contact:'/lingmall/my/service/contacts/{contactsID}',
				infoPro:'/lingmall/my/service/info/{batchNumber}/{barcode}',
				submit:'/lingmall/my/service/submit/{batchNumber}'
			};
			_.each(urlDict,function(v,k){
				urlDict[k] = urlPrefix + v;
			});

			var methodDict = {
				post:'POST',
				get:'GET'
			};

			// 获取枚举的元数据
			this.metadata = function(type){
				return $http({
					url:urlDict.metadata.replace('{type}',type),
					method:methodDict.get
				});
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
			this.service = function(startTime,endTime,status,pageIndex,pageSize){
				return $http({
					url:urlDict.service,
					method:methodDict.post,
					data:{
						access_token:userService.token(),
						startTime:startTime,
						endTime:endTime,
						status:status,
						page:pageIndex-0+1,
						count:pageSize
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

			// 查看联系人
			this.contact = function(contactsID){
				return $http({
					url:urlDict.contact.replace('{contactsID}',contactsID),
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

			// 获取分类
			this.category = function(){
				return $http({
					url:urlDict.category,
					method:methodDict.get
				});
			};

			// 获取次级分类
			this.subCategory = function(subId){
				return $http({
					url:urlDict.subCategory.replace('{id}',subId),
					method:methodDict.get
				});
			};

			this.goodlist = function(level,catId,pageIndex,pageSize){
				var opts = {
					level:level,
					catId:catId,
					page:pageIndex-0+1,
					count:pageSize
				};
				return $http({
					url:urlDict.goodslist,
					method:methodDict.post,
					data:opts
				});
			};
		}]);
	}
);