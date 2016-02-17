(function(){
    var app = angular.module('main-page',['ngRoute']);
    var email = "";
    var password = "";
    var myDataRef = new Firebase('https://spiritanimalmatch.firebaseio.com/');
    var chatRef = new Firebase('https://spiritanimalmatch.firebaseio.com/chat');
    var animal = 0;
    app.config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'partials/index.html', controller:'mainCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/newUser.html', controller:'newUser'
        })
        .when('/quiz',{
            templateUrl: 'partials/quiz.html', controller:'quiz'
        })
        .when('/profile', {
            templateUrl: 'partials/profile.html', controller:'profile'
        })
        .otherwise({
            redirectTo:'/'
        })
        
    });
    app.directive('header', function(){
        
        return{
        restrict: 'E', 
        replace: true,
        templateUrl: 'html_directives/header.html',
        controller: ['$scope', '$filter','$location' ,function ($scope, $filter, $location, $element) {
            var authData = myDataRef.getAuth();
            if(authData){
                $scope.user = true;
            }
            $scope.new_user = function(){
                $location.path('login');
            }
            $scope.login_click = function(){
                if($scope.log_in){
                    $scope.log_in = false;
                }else{
                    $scope.log_in = true;
                }
            }
            $scope.login_ = function(){
                login($scope, false, $location);
                
            }
            $scope.log_out = function(){
                myDataRef.unauth();
                $scope.user = false;
            }
            
        }]
        };
    });
        
    app.controller('mainCtrl', function($scope){
         $scope.user = false;
    });
    app.controller('newUser', function($scope){
        
    });
    app.controller('profile', function($scope, $location){
        if($scope.user == false){
            $location.path("/");
        }
        //firebase things
        
        myDataRef.onAuth(function(authData) {
            if (authData) {
                var my_child = myDataRef.child(authData.uid);
                my_child.once("value", function(data){
                    animal = Math.floor((data.val().sum - 5)/3.33);//0-3 = mouse 4-7 = snake 8-11 = fox 12-15 = wolf 16-19 = bear 20 = t-rex
                    //the comment above was just for me, showing how things would be distributed if it was divided by 4, but 3.33 creates better spread
                    $scope.spirit_name = spirit_names_array[animal];
                    $scope.spirit_description= spirit_descriptions_array[animal];
                });
            }
       });
       
       $scope.login_chat = function(){
          chatRef.authWithPassword({
              email    : document.querySelector("#email").value,
              password : document.querySelector("#password").value
            }, function(error, authData) {
            if (error) {alert(error)}
              else{
                  
              }
          });
          chatRef.onAuth(function(authData) {
              // Once authenticated, instantiate Firechat with our user id and user name
              if (authData) {
                initChat(authData);
              }
            });
        }
       //angular things
       $scope.getSpiritImage = function(){
          console.log("/partials/profile_images/p" + (animal + 1) + ".jpg");
           $scope.spirit_name = spirit_names_array[animal];
           $scope.spirit_description= spirit_descriptions_array[animal];
          return "partials/profile_images/p" + (animal + 1) + ".jpg";
        
       }
       
    });
    app.controller('quiz', function($scope, $location){
        var image = document.querySelector("#big_image");
        if (typeof image !== 'undefined')
        {var chromata = new Chromata(image);
        chromata.start();}
        var image_num=0;
        var sum = 0;
        $scope.getImageSRC = function(){
            var path = "partials/images/array" + image_num + ".png";
            if (doesFileExist(path)){
                    return path;
                }
                else{
                    return "partials/images/array" + image_num + ".gif";
                }
            
        }
    
        $scope.getOpSRC = function(number){
            //var path = "partials/images/op" + number + "/num" + image_num + ".gif";
            return "partials/images/op" + number + "/num" + image_num + ".png"
            if (doesFileExist(path)){
                    return path;
                }
                else{
                    return "partials/images/op" + number + "/num" + image_num + ".png";
                }
                
            //console.log("partials/images/op" + number + "/num" + image_num + ".png");
            
        }
        $scope.op = function(number){
            sum = sum + number;
            image_num = image_num + 1;
            if(image_num === 5){
                myDataRef.onAuth(function(authData) {
            if (authData) {
                var my_child = myDataRef.child(authData.uid);
                my_child.update({
                    sum: sum
                });
                animal = sum;    
            }
            });
            $location.path("/profile");
        }
        }});
    //this long bit of code is used for creating the user accounts
    app.controller('accountCreation', function($scope, $location){
        
        $scope.submit_email = function(){
            var variable = document.querySelector("#name").value;
            if (typeof variable !== 'undefined') {
                // the variable is defined
            
            myDataRef.createUser({
                email    : document.querySelector("#email").value,
                password : document.querySelector("#password").value
                }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                    if(error == "The specified email address is already in use."){
                        login();
                    }
                    else{
                        alert(error);
                    }
                    return;
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    login($scope ,true, $location); 
                    $location.path('/quiz');
                }
            });
            }
        else{
            alert("no name was entered!");
        }};
        
        $scope.submit_facebook = function(){
            
        };
        $scope.submit_google = function(){
            
        };
    });
    //*************************************************************
    //helper functions
    function login($scope , set, $location){
    var ref = myDataRef;
    email = document.querySelector("#email").value;
    password = document.querySelector("#password").value;
    console.log(document.querySelector("#email").value);
    ref.authWithPassword({
      email    : document.querySelector("#email").value,
      password : document.querySelector("#password").value
    }, function(error, authData) {
      if (error) {
        switch (error.code) {
      case "INVALID_EMAIL":
        console.log("The specified user account email is invalid.");
        break;
      case "INVALID_PASSWORD":
        console.log("The specified user account password is incorrect.");
        break;
      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;
      default:
        console.log("Error logging user in:", error);
    }
      } else {
        console.log("Authenticated successfully with payload:", authData);
        remember: "sessionOnly";
        if(set){
            ref.child(authData.uid).set({
                        name: document.querySelector("#name").value,
                        gender: $scope.gender,
                        sum:0
                    });
            $location.path('/quiz');
          }
          $scope.user = true;
          $scope.$apply();
          
      }
    });
}
    function doesFileExist(urlToFile)
    {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', urlToFile, false);
        xhr.send();

        if (xhr.status == "404") {
            return false;
        } else {
            return true;
        }
    }
    function initChat(authData) {
        var name = "Bill";
        var my_child = myDataRef.child(authData.uid);
        my_child.on("value", function(data){
          name = data.val().name;  
        });
      var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
      chat.setUser(authData.uid, name);
    }
    var spirit_names_array = ["Walks with Mouse", "Bites with Snake", "Sneaks with Fox", "Hunts with Wolf", "Mauls with Bear", "Destoys with Lazers"];
    var spirit_descriptions_array=["The food chain does not get much lower than a mouse...", "At least snakes are above a mouse", "Foxes are cool", "You are the alpha (fe)male wolf-a true leader", "You're a bear, no one is going to mess with you", "You have the aggression level and food chain dominance of a 9 ton superpredator with lazerbeams attached to their head"];
})();