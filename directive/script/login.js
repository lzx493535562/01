/* 
* @Author: Marte
* @Date:   2016-03-10 10:26:52
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-10 10:27:24
*/

define(["app"],function(app){
    app.directive("lmlogin",function(){
            return {
                        restrict:"E",
                        templateUrl:"/directive/html/login.html",
                        link:function($scope,$element,$attrs){

                        }
                    }

    });

});