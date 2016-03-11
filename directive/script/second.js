/* 
* @Author: Marte
* @Date:   2016-03-09 17:16:26
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-10 10:13:43
*/
define(["app"],function(app){
    app.directive("lmsecond",function(){
            return{
                    restrict:"E",
                    templateUrl:"/directive/html/second.html",
                    link:function($scope,$element,$attrs){

                    }
            }
    });
});