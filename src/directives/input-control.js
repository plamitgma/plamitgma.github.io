(function () {
    'use strict';

    angular.module('main')
        .directive('eInputControl', inputControl);

    function inputControl() {
        var directive = {
            restrict: 'EA',
            require: 'ngModel',
            controller: inputControlCtrl,
            templateUrl: 'src/directives/input-control.html',
            scope: {
                ngModel: '=',
                type: '@',
                typeData: '@'
            },
            controllerAs: 'vm'
        };
        return directive;
    }

    inputControlCtrl.$inject = ['$scope', '$firebaseArray'];

    function inputControlCtrl($scope, $firebaseArray) {
        var vm = this;
        if ($scope.type == '9' || $scope.type == '10' || $scope.type == '11') {
            vm.roundOfFundingList = [
                "Series A",
                "Series B",
                "Series C"
            ]
        }
    }

})();
