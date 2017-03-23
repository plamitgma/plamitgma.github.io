(function () {
    'use strict';

    angular.module('main')
        .directive('eSelectBoxControl', countryControl);

    function countryControl() {
        var directive = {
            restrict: 'EA',
            controller: countryControlCtrl,
            templateUrl: 'src/directives/select-box-control.html',
            scope: {
                type: '@'
            }
        };
        return directive;
    }

    countryControlCtrl.$inject = ['$scope', 'settingsService'];

    function countryControlCtrl($scope, settingsService) {
        $scope.dataModel = [
        ];
        var date = new Date();
        $scope.time = '' + date.getUTCFullYear() + date.getUTCMonth() + date.getUTCMinutes() + date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds() + date.getUTCMilliseconds();
        $scope.loadData = function (query) {
            if ($scope.type == 5 || $scope.type == 6)
                return $scope.countriesData.filter(function (item) {
                    return item.toLowerCase().indexOf(query.toLowerCase()) > -1;
                })
            return industryVerticalData.filter(function (item) {
                return item.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        };

        $scope.tagAdded = function () {
            if ($scope.type == 5 || $scope.type == 7) {

                var element = document.getElementById('select-box-control-' + $scope.time);
                var input = element.getElementsByTagName("input")[0];
                if (input) {
                    input.disabled = true;
                    input.placeholder = "";
                    input.style.backgroundColor = "white";
                }

            }

        }
        $scope.tagRemoved = function () {
            if ($scope.type == 5 || $scope.type == 7) {
                var element = document.getElementById('select-box-control-' + $scope.time);
                var input = element.getElementsByTagName("input")[0];
                if (input) {
                    input.disabled = false;
                    input.placeholder = "Select a country";
                }
            }
        }
        $scope.countriesData = settingsService.getOrInitCountries();

        var industryVerticalData = settingsService.getOrInitIndustryVertical();
    }
})();
