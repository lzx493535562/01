requirejs.config({
	//默认情况下模块所在目录为js/lib
	baseUrl: '/',
	//当模块id前缀为app时，他便由js/app加载模块文件
	//这里设置的路径是相对与baseUrl的，不要包含.js
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute:"bower_components/angular-route/angular-route.min",
		angularMd5:"bower_components/angular-md5/angular-md5.min",

		// 用以blob技术打包
		fileSaver:"bower_components/filesaver/FileSaver.min",
		jszip:"bower_components/jszip/dist/jszip",

		underscore:"bower_components/underscore/underscore",
		async:"bower_components/async/dist/async.min",
		//
		route:"script/route",
		app:"script/app",
		
		// service
		// "service-request":"service/script/request",
		// ctrl
		"ctrl-index":"controller/script/index",
		// directive
		"directive-test":"directive/script/test",

		// addons
		"cookie":"bower_components/cookie/cookie.min",

		// end tail
		"jquery":"bower_components/jquery/dist/jquery.min"
	},
	shim:{
		'angularRoute':["angular"],
		"angularMd5":["angular"]
	}
 
});

// 开始逻辑.
requirejs(['jquery','route','app'],function($,route,app){
	route.init();
	$(function(){
		angular.bootstrap(document.body,[app.name]);
	});
});