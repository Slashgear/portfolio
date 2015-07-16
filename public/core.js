
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

var portfolio = angular.module('portfolio',['jm.i18next','ngRoute','ngSanitize','angular-google-analytics'])
.config(function(AnalyticsProvider) {
        AnalyticsProvider.setAccount('UA-XXXXX-xx');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.trackUrlParams(true);

        // Optional set domain (Use 'none' for testing on localhost)
        AnalyticsProvider.setDomainName('XXX');
        AnalyticsProvider.useDisplayFeatures(true);
        // url prefix (default is empty)
        // - for example: when an app doesn't run in the root directory
        AnalyticsProvider.trackPrefix('my-application');
        AnalyticsProvider.useAnalytics(true);
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.useEnhancedLinkAttribution(true);
        AnalyticsProvider.setPageEvent('$stateChangeSuccess');
        AnalyticsProvider.delayScriptTag(true);
}).run(function(Analytics) {
      // For automatic page tracking
});

portfolio.config(function ($routeProvider) {
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
    .otherwise({
      redirectTo: '/'
    });
});

portfolio.controller('mainController', function($scope,$i18next) {
  angular.element(document).ready(function () {
      $.material.init();
  });
  $scope.setEn = function() {
    $i18next.options.lng = 'en';
  };
  $scope.setFr = function() {
    $i18next.options.lng = 'fr';
  };
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
       $scope.submitted = true;
       $scope.submitButtonDisabled = true;
       $http({
           method  : 'POST',
           url     : 'public/contact-form.php',
           data    : param($scope.formData),  //param method from jQuery
           headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
       }).success(function(data){
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
      //e.preventDefault();
   }
});

portfolio.controller('cursusController',function ($scope,$i18next) {

});

portfolio.controller('projectsController',function ($scope,$i18next) {

})
