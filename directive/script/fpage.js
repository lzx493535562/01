/* 
* @Author: Marte
* @Date:   2016-03-09 11:00:14
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-09 11:04:45
*/
define(["app"],function(app){
    app.directive("lmfpage",function(){
            return {
                        restrict:"E",
                        templateUrl:"/directive/html/fpage.html",
                        link:function($scope,$element,$attrs){

                        }
                    }

    });

});