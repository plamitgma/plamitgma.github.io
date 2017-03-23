(function () {
    angular.module('main.settings', ['ngRoute'])
        .config(settingsConfig)
        .controller('settingsCtrl', settingsCtrl);

    settingsConfig.$inject = ['$routeProvider'];

    function settingsConfig($routeProvider) {
        $routeProvider
            .when('/setting', {
                title: 'Setting',
                controller: 'settingsCtrl',
                templateUrl: 'src/views/setting/setting.html',
                controllerAs: 'vm'
            });
    }

    settingsCtrl.$inject = ['$scope', '$timeout', '$firebaseObject', 'settingsService'];

    function settingsCtrl($scope, $timeout, $firebaseObject, settingsService) {
        var leftPanel = $('#setting-left-panel');
        window.onresize = function (event) {
            var height = $(window).height() - 90;
            leftPanel.css('height', height);
        }
        var vm = this;
        vm.addNewField = addNewField;
        vm.addObjectiveOption = addObjectiveOption;
        vm.removeObjectiveOption = removeObjectiveOption;
        vm.addSection = addSection;
        vm.deleteSection = deleteSection;
        vm.deleteSectionField = deleteSectionField;
        vm.getItemDrag = getItemDrag;
        vm.saveAll = saveAll;
        vm.newSectionValue = "";
        vm.mainSection = settingsService.initMainSection();
        var newObjectiveOption = {
            name: "",
            section: ""
        };
        vm.newField = {
            name: '',
            type: 1,
            required: false,
            dataType: 'Normal'
        };
        vm.inputList = settingsService.getInputList();
        vm.sections = [];
        $scope.sections = {};
        var ref = firebase.database().ref().child("sections");
        var syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope, 'sections');
        syncObject.$loaded().then(function (response) {
            if (!$scope.sections.mainSection) {
                $scope.sections.mainSection = angular.copy(vm.mainSection);
            }
            else {
                vm.mainSection = angular.copy($scope.sections.mainSection);
                if (!vm.mainSection.fields) {
                    vm.mainSection.fields = [];
                }
            }
            if (!$scope.sections.dynamicSection) {
                $scope.sections.dynamicSection = [];
            }
            else {
                vm.sections = angular.copy($scope.sections.dynamicSection);
            }
            $('body').addClass('loaded');
        })
        $timeout(function () {
            var height = $(window).height() - 90;
            leftPanel.css('height', height);
        });

        vm.requireSelection = settingsService.getRequiredSelectionList();

        function getItemDrag(type) {
            return settingsService.getItemDrag(type);
        }

        function addObjectiveOption() {
            if (!vm.mainSection.objective.options)
                vm.mainSection.objective.options = [];
            vm.mainSection.objective.options.push(angular.copy(newObjectiveOption));
        }

        function removeObjectiveOption(index) {
            vm.mainSection.objective.options.splice(index, 1);
        }

        function addSection() {
            if (!vm.newSectionValue)
                return;
            var date = new Date();
            var sectionId = '' + date.getUTCFullYear() + date.getUTCMonth() + date.getUTCMinutes() + date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds() + date.getUTCMilliseconds();
            vm.sections.push({
                id: sectionId,
                name: vm.newSectionValue,
                fields: []
            })
            vm.newSectionValue = '';
            $timeout(function () {
                var newSection = $('#section-btn-' + sectionId);
                if (newSection && newSection[0]) {
                    newSection[0].scrollIntoView(true);
                }
            });
        }

        function deleteSection(index) {
            vm.sections.splice(index, 1);
        }

        function addNewField(index, isMainSection) {
            if (isMainSection) {
                if (!vm.mainSection.fields) {
                    vm.mainSection.fields = [];
                }
                vm.mainSection.fields.push(angular.copy(vm.newField));
            }
            else {
                if (!vm.sections[index].fields) {
                    vm.sections[index].fields = [];
                }
                vm.sections[index].fields.push(angular.copy(vm.newField));
            }
        }

        function deleteSectionField(sectionIndex, index, isMainSection) {
            if (isMainSection) {
                vm.mainSection.fields.splice(index, 1);
            }
            else {
                vm.sections[sectionIndex].fields.splice(index, 1);
            }
        }

        function saveAll() {
            $scope.sections.mainSection = vm.mainSection;
            $scope.sections.dynamicSection = vm.sections;
        }
    }
})();