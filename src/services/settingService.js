(function () {
    'use strict';

    angular.module('main')
        .factory('settingsService', settingsFactory);

    settingsFactory.$inject = ['$firebaseArray'];

    function settingsFactory($firebaseArray) {
        var service = {
            initMainSection: initMainSection,
            getItemDrag: getItemDrag,
            getRequiredSelectionList: getRequiredSelectionList,
            getInputList: getInputList,
            getOrInitCountries: getOrInitCountries,
            getOrInitIndustryVertical : getOrInitIndustryVertical 
        };
        var cachedAllCountries = [];
        var cachedAllIndustryVertical = [];

        return service;

        function initMainSection() {
            return {
                sectionName: 'Main Section',
                sectionDescription: 'Your Information',
                name: {
                    name: 'Name',
                    type: 1,
                    required: true
                },
                email: {
                    name: 'Email',
                    type: 'Email',
                    required: true
                },
                fields: [],
                objective: {
                    name: 'Objective',
                    type: 'Dropdown',
                    required: true,
                    options: []
                }
            }
        }

        function getItemDrag(type) {
            var item = {
                name: type,
                type: '',
                required: false,
                dataType: type
            };
            switch (type) {
                case 'Amount Raised':
                    item.type = 3;
                    break;
                case 'Amount to Raise':
                    item.type = 4;
                    break;
                case 'Country':
                    item.type = 5;
                    break;
                case 'Industry Vertical':
                    item.type = 7;
                    break;
                case 'Round of Funding':
                    item.type = 9;
                    break;
                default:
                    item.type = 1;
                    break;
            }
            return item;
        }

        function getRequiredSelectionList() {
            return [
                {
                    name: "Required",
                    value: true
                },
                {
                    name: "Optional",
                    value: false
                }
            ]
        }

        function getInputList() {
            return [
                {
                    id: 1,
                    name: "Textbox",
                    type: "Normal"
                },
                {
                    id: 2,
                    name: "Textarea",
                    type: "Normal"
                },
                {
                    id: 3,
                    name: "Number",
                    type: "Amount Raised"
                },
                {
                    id: 4,
                    name: "Number",
                    type: "Amount to Raise"
                },
                {
                    id: 5,
                    name: "Select-2-box (1-value)",
                    type: "Country"
                },
                {
                    id: 6,
                    name: "Select-2-box (multiple value)",
                    type: "Country"
                },
                {
                    id: 7,
                    name: "Select-2-box (1-value)",
                    type: "Industry Vertical"
                },
                {
                    id: 8,
                    name: "Select-2-box (multiple value)",
                    type: "Industry Vertical"
                },
                {
                    id: 9,
                    name: "Radio",
                    type: "Round of Funding"
                },
                {
                    id: 10,
                    name: "Dropdown",
                    type: "Round of Funding"
                },
                {
                    id: 11,
                    name: "Checkbox",
                    type: "Round of Funding"
                },
                {
                    id: 12,
                    name: "Email",
                    type: "Normal"
                }
            ]
        }

        function getOrInitCountries() {
            if (cachedAllCountries.length > 0) {
                return cachedAllCountries;
            }
            var ref = firebase.database().ref().child("countries");
            var countries = $firebaseArray(ref);
            countries.$loaded().then(function (response) {
                parseDataToStringArray(countries, cachedAllCountries);
                return cachedAllCountries;
            })
        }

        function getOrInitIndustryVertical() {
            if (cachedAllIndustryVertical.length > 0) {
                return cachedAllIndustryVertical;
            }
            var ref = firebase.database().ref().child("IndustryVetical");
            var industryVetical = $firebaseArray(ref);
            industryVetical.$loaded().then(function (response) {
                parseDataToStringArray(industryVetical, cachedAllIndustryVertical);
                return cachedAllIndustryVertical;
            })
        }

        function parseDataToStringArray(data, cachedData) {
            for (var i = 0; i < data.length; i++) {
                cachedData.push(data[i].$value);
            }
        }

    }
})();
