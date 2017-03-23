(function () {
    angular.module('main.home', ['ngRoute'])
        .config(homeConfig)
        .controller('homeCtrl', homeCtrl);

    homeConfig.$inject = ['$routeProvider'];

    function homeConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                title: 'Home',
                controller: 'homeCtrl',
                templateUrl: 'src/views/home/home.html',
                controllerAs: 'vm'
            });
    }

    homeCtrl.$inject = ['$scope', '$timeout', '$firebaseObject', 'settingsService'];

    function homeCtrl($scope, $timeout, $firebaseObject, settingsService) {
        var vm = this;
        vm.objectiveSelected = null;
        vm.isBuyTicketForYourSelf = null;
        vm.handleObjectiveChange = handleObjectiveChange;
        settingsService.getOrInitCountries();
        settingsService.getOrInitIndustryVertical();
        var ref = firebase.database().ref().child("sections");
        var syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope, 'sections');
        syncObject.$loaded().then(function (response) {
            if (!$scope.sections.mainSection) {
                vm.mainSection = angular.copy(settingsService.initMainSection());
            }
            else {
                vm.mainSection = angular.copy($scope.sections.mainSection);
            }
            if(!vm.mainSection.objective.options){
                vm.mainSection.objective.options = [];
            }
            vm.mainSection.objective.options.splice(0, 0, {"name":"---Please select---","section":""} );
            if (!$scope.sections.dynamicSection) {
                vm.dynamicSection = [];
            }
            else {
                vm.dynamicSection = $scope.sections.dynamicSection;
            }
            $('body').addClass('loaded');
        });
        function handleObjectiveChange() {
            if (vm.objectiveSelected && vm.mainSection.objective.options) {
                vm.section = vm.dynamicSection.filter(
                    function (item) {
                        return item.id === vm.objectiveSelected.section;
                    })[0];
            }
            else {
                vm.section = null;
            }
        }

        vm.sourceList = [
            "---Please select---",
            "Facebook",
            "Twitter",
            "e27.co",
            "Others"
        ]
    }
})();