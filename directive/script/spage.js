/* 
* @Author: Marte
* @Date:   2016-03-09 17:16:26
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-09 17:36:01
*/
define(["app"],function(app){
    app.directive("lmspage",function(){
            return{
                    restrict:"E",
                    templateUrl:"/directive/html/spage.html",
                    link:function($scope,$element,$attrs){

                    }
            }
    });
});