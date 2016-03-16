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
		dateJs:'bower_components/DateJS/build/production/date-zh-CN.min',
		//
		route:"script/route",
		app:"script/app",
		
		// service
		"service-goods":"service/script/goods",
		"service-user":"service/script/user",
		"service-img":"service/script/img",
		"service-util":"service/script/util",
		// ctrl
		"ctrl-index":"controller/script/index",
		"ctrl-mygoodspage":"controller/script/mygoodspage",
		"ctrl-loginpage":"controller/script/loginpage",
		"ctrl-auditmanagementpage":"controller/script/auditmanagementpage",
		"ctrl-categorydatapage":"controller/script/categorydatapage",
		"ctrl-detailpage":"controller/script/detailpage",
		"ctrl-firstpage":"controller/script/firstpage",
		"ctrl-secondpage":"controller/script/secondpage",
		"ctrl-thirdpage":"controller/script/thirdpage",
		"ctrl-fourpage":"controller/script/fourpage",
		// directive
		"directive-test":"directive/script/test",
		"directive-mygoods":"directive/script/mygoods",
		"directive-topbar":"directive/script/topbar",
		"directive-copyright":"directive/script/copyright",
		"directive-topmenu":"directive/script/topmenu",
		"directive-sidebar":"directive/script/sidebar",
		"directive-pager":"directive/script/pager",
		"directive-leftsidebar":"directive/script/leftsidebar",
		"directive-auditmanagement":"directive/script/auditmanagement",
		"directive-detail":"directive/script/detail",
		"directive-headbar":"directive/script/headbar",
		"directive-categorydata":"directive/script/categorydata",
		"directive-allorders":"directive/script/allorders",
		"directive-shopcart":"directive/script/shopcart",
		"directive-minpager":"directive/script/minpager",
		"directive-verify":"directive/script/verify",
		"directive-modal":"directive/script/modal",
		"directive-first":"directive/script/first",
		"directive-second":"directive/script/second",
		"directive-third":"directive/script/third",
		"directive-login":"directive/script/login",
		"directive-four":"directive/script/four",
		"directive-select":"directive/script/select",

		// filter
		"filter-goodsType":"filter/script/goodsType",

		// addons
		"cookie":"bower_components/cookie/cookie.min",
		'datePicker':'bower_components/DatePicker/js/datepicker',

		// end tail
		"jquery":"bower_components/jquery/jquery.min"
	},
	shim:{
		'angularRoute':["angular"],
		"angularMd5":["angular"],
		'datePicker':['jquery']
	}
 
});

// 开始逻辑.
requirejs(['jquery','route','app'],function($,route,app){
	route.init();
	$(function(){
		angular.bootstrap(document.body,[app.name]);
	});
});
