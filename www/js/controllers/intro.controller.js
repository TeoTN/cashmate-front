(function () {
  "use strict";
  angular.module('cashmate')
    .controller("IntroController", IntroController);


  IntroController.$inject = ['$scope', '$location'];
  function IntroController($scope, $location) {
    var intro = [
      {
        title: 'Earn virtual money',
        text: 'Watch advertisements, answer a few simple questions about them and we will give you virtual money!',
        icon: 'img/dollar.png'
      },
      {
        title: 'Get a discount',
        text: 'The money you earn can be exchanged for a discount in restaurants, shops and many more!',
        icon: 'img/label.png'
      },
      {
        title: 'Enjoy!',
        text: '',
        icon: 'img/done.png'
      }
    ];
    $scope.step = 0;
    $scope.$watch('step', function(step) {
      var curr = intro[step];
      $scope.title = curr.title;
      $scope.text = curr.text;
      $scope.icon = curr.icon;
    });
    $scope.skip = function() {
      $location.path('/dashboard');
    };
    $scope.nextStep = function() {
      $scope.step++;
      if ($scope.step === intro.length-1) {
        $scope.last = true;
        $scope.skip();
      }
    };

  }
})();
