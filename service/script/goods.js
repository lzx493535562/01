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
				serviceDetail:'/lingmall/my/service/{serviceNumber}',
				progress:'/lingmall/my/service/progress/{serviceNumber}',
				contact:'/lingmall/my/service/contacts/{contactsID}',
				infoPro:'/lingmall/my/service/info/{serviceNumber}/{barcode}',
				submit:'/lingmall/my/service/{serviceNumber}',

				// shopcart
				shopcart:'/lingmall/my/shopcart'
			};
			_.each(urlDict,function(v,k){
				urlDict[k] = urlPrefix + v;
			});

			var methodDict = {
				post:'POST',
				get:'GET',
				put:'PUT',
				delete:'DELETE'
			};

			// 元数据类型编号
			this.metadataTypeDict = {
				// 服务状态
				serviceStatus:6,
				goodsType:7,
				// sub服务状态
				serviceDetailStatus:8
			};

			// 特殊状态
			// 审核通过状态
			this.SERVICE_DETAIL_PASS_STATUS = 3;

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
			this.progress = function(serviceNumber){
				return $http({
					url:urlDict.progress.replace('{serviceNumber}',serviceNumber),
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
			this.serviceDetail = function(serviceNumber,classId,status,barcode,pageIndex,pageSize){
				return $http({
					url:urlDict.serviceDetail.replace('{serviceNumber}',serviceNumber),
					method:methodDict.post,
					data:{
						access_token:userService.token(),
						classId:classId,
						status:status,
						barcode:barcode,
						page:pageIndex-0+1,
						count:pageSize
					}
				});
			};

			// 查询审核的批次的条码详情
			this.info2 = function(serviceNumber,barcode){
				return $http({
					url:urlDict.info2.replace('{serviceNumber}',serviceNumber).replace('{barcode}',barcode),
					method:methodDict.post,
					data:{
						access_token:userService.token()
					}
				});
			};

			// 审核
			// list:
			/*
				barcode:barcode,
				status:status,
				rejectType:rejectType,
				rejectContent:rejectContent
			*/
			this.submit = function(serviceNumber,list){
				return $http({
					url:urlDict.submit.replace('{serviceNumber}',serviceNumber),
					method:methodDict.put,
					data:{
						access_token:userService.token(),
						param:list
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


			// 通过分类Id获取商品
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

			// --------------------------------------------------------------------------------------
			// 购物车 -------------------------------------------------------------------------------
			// --------------------------------------------------------------------------------------

			// 获取购物车中的商品
			this.shopcart = function(pageIndex,pageSize){
				var opts ={
					access_token:userService.token(),
					page:pageIndex-0+1,
					count:pageSize
				};
				return $http({
					url:urlDict.shopcart,
					method:methodDict.post,
					data:opts
				});
			};

			// 商品放入购物车
			// goodlist格式为{goodsId:...,db:...}
			this.shopcartAdd = function(goodlist){
				var opts = {
					access_token:userService.token(),
					param:goodlist
				};
				return	$http({
					url:urlDict.shopcart,
					method:methodDict.put,
					data:opts
				});
			};

			// 商品移出购物车
			// goodlist格式为{goodsId:...,db:...}
			this.shopcartRemove = function(goodlist){
				var opts = {
					access_token:userService.token(),
					param:goodlist
				};
				return	$http({
					url:urlDict.shopcart,
					method:methodDict.delete,
					data:opts
				});
			};

		}]);
	}
);