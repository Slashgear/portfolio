
angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
    var lang=navigator.language;
    $i18nextProvider.options = {
        lng: lang,
        useCookie: true,
        useLocalStorage: false,
        fallbackLng: 'fr',
        resGetPath: 'public/locales/__lng__/__ns__.json',
        defaultLoadingValue: '' // ng-i18next option, *NOT* directly supported by i18next
    };
}]);

var portfolio = angular.module('portfolio',['jm.i18next','ngRoute','ngSanitize','ui.bootstrap'])

portfolio.factory('Page', function(){
  var title = 'default';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

portfolio.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      controller: "mainController",
      templateUrl: "public/views/home.html"
    })
    .when('/cursus', {
      controller: "cursusController",
      templateUrl: "public/views/cursus.html"
    })
    .when('/projects', {
      controller: "projectsController",
      templateUrl: "public/views/projects.html"
    })
    .when('/lang/:lg',{
      controller: "lgController",
      templateUrl: "public/views/home.html",
      redirectTo:"/"
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
});

portfolio.controller('mainController', function($scope,$i18next,$location,$anchorScroll,Page) {
  angular.element(document).ready(function () {
      $.material.init();
  });
  $scope.language=$location.search().lg;
  $i18next.options.lng = $scope.language;
  Page.setTitle("Antoine Caron | Portfolio");
  $scope.setEn = function() {
    $i18next.options.lng = 'en';
  };
  $scope.setFr = function() {
    $i18next.options.lng = 'fr';
  };
  $scope.goForm =  function(){
    $location.hash('Contact');
    $anchorScroll();
  }
});

var param = function(data) {
  var returnString = '';
  for (var d in data){
    if (data.hasOwnProperty(d)){
    returnString += d + '=' + data[d] + '&';}
  }
  return returnString.slice( 0, returnString.length - 1 );
};

portfolio.controller('contactController',function ($scope,$http) {
  $scope.result = 'hidden';
   $scope.resultMessage;
   $scope.formData; //formData is an object holding the name, email, subject, and message
   $scope.submitButtonDisabled = false;
   $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
   $scope.submit = function(contactform, e) {
       angular.element('#send').button('loading');
       $scope.submitted = true;
       $scope.submitButtonDisabled = true;
       $http({
           method  : 'POST',
           url     : 'public/contact-form.php',
           data    : param($scope.formData),  //param method from jQuery
           headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
       }).success(function(data){
          angular.element('#send').button('reset');
           var answer=data.substring(data.lastIndexOf("{"),data.lastIndexOf("}")+1);
           answer=JSON.parse(answer);
           if (answer) { //success comes from the return json object
               $scope.submitButtonDisabled = true;
               $scope.resultMessage = answer.message;
               $scope.result='alert alert-dismissable alert-success';
           } else {
               $scope.submitButtonDisabled = false;
               $scope.resultMessage = answer.message;
               $scope.result='alert alert-dismissable alert-danger';
           }
       });
   }
});

portfolio.controller('modalPreviewController',function ($scope, $modal) {
  $scope.url="";
  $scope.open = function ($event,size) {
   $scope.url=angular.element($event.currentTarget).data('url');
   var modalInstance = $modal.open({
     animation: true,
     templateUrl: 'myModalContent.html',
     controller: 'modalInstanceController',
     size: size,
     resolve:{
       url: function () {
         return $scope.url;
       }
     }
   })};
});

portfolio.controller('modalInstanceController',function ($scope, $modalInstance,url) {
  $scope.url=url;
  $scope.ok = function () {
   $modalInstance.close();
 };
});

portfolio.controller('lgController',function ($i18next,$routeParams) {
  var lg=$routeParams.lg;
  $i18next.options.lng=lg;
});

portfolio.controller('headController',function ($scope, Page) {
  $scope.Page = Page;
});

portfolio.controller('cursusController',function ($scope, Page) {
  Page.setTitle("Portfolio | Cursus");
});
portfolio.controller('projectsController',function ($scope, Page) {
  Page.setTitle("Portfolio | Projects");
});
