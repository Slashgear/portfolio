
angular.module('jm.i18next').config(['$i18nextProvider', function ($i18nextProvider) {
    $i18nextProvider.options = {
        lng: 'fr',
        useCookie: false,
        useLocalStorage: false,
        fallbackLng: 'fr',
        resGetPath: '/public/locales/__lng__/__ns__.json',
        defaultLoadingValue: '' // ng-i18next option, *NOT* directly supported by i18next
    };
}]);

var portfolio = angular.module('portfolio',['jm.i18next']);

portfolio.controller('mainController',function ($scope,$i18next) {
  angular.element(document).ready(function () {
      $.material.init();
      $i18next.options.lng='fr';
  });
});
