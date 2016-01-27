(function(){
    var app = angular.module('main-page',[]);
    app.directive('header', function(){
        return{
        restrict: 'A', //This means that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: {user: '='}, // This is one of the cool things. Will be explained in post.
        templateUrl: '../html_directives/header.html',
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here 
        }]
        };
    });
        app.directive('footer', function(){
        return{
        restrict: 'A', //This means that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: '../html_directives/footer.html',
        controller: ['$scope', '$filter', function ($scope, $filter) {
            // Your behaviour goes here 
        }]
        };
    });
})();