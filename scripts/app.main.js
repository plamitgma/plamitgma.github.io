function mainConfig(e){e.when("/",{redirectTo:"/home"}).otherwise({redirectTo:"/home"})}angular.module("main",["ngRoute","ngAnimate","main.home","main.settings","dndLists","firebase","ngTagsInput"]).run(function(){var e={apiKey:"AIzaSyAdAv-q6ogRT2rSAqAQ6cd8BrD--MCpwUw",authDomain:"localhost",databaseURL:"https://test-e27.firebaseio.com/"};firebase.initializeApp(e)}).config(mainConfig),mainConfig.$inject=["$routeProvider"],function(){function e(e){e.when("/setting",{title:"Setting",controller:"settingsCtrl",templateUrl:"src/views/setting/setting.html",controllerAs:"vm"})}function t(e,t,n,i){function o(e){return i.getItemDrag(e)}function c(){f.mainSection.objective.options||(f.mainSection.objective.options=[]),f.mainSection.objective.options.push(angular.copy(g))}function a(e){f.mainSection.objective.options.splice(e,1)}function r(){if(f.newSectionValue){var e=new Date,n=""+e.getUTCFullYear()+e.getUTCMonth()+e.getUTCMinutes()+e.getUTCHours()+e.getUTCMinutes()+e.getUTCSeconds()+e.getUTCMilliseconds();f.sections.push({id:n,name:f.newSectionValue,fields:[]}),f.newSectionValue="",t(function(){var e=$("#section-btn-"+n);e&&e[0]&&e[0].scrollIntoView(!0)})}}function s(e){f.sections.splice(e,1)}function l(e,t){t?(f.mainSection.fields||(f.mainSection.fields=[]),f.mainSection.fields.push(angular.copy(f.newField))):(f.sections[e].fields||(f.sections[e].fields=[]),f.sections[e].fields.push(angular.copy(f.newField)))}function u(e,t,n){n?f.mainSection.fields.splice(t,1):f.sections[e].fields.splice(t,1)}function d(){e.sections.mainSection=f.mainSection,e.sections.dynamicSection=f.sections}var m=$("#setting-left-panel");window.onresize=function(e){var t=$(window).height()-90;m.css("height",t)};var f=this;f.addNewField=l,f.addObjectiveOption=c,f.removeObjectiveOption=a,f.addSection=r,f.deleteSection=s,f.deleteSectionField=u,f.getItemDrag=o,f.saveAll=d,f.newSectionValue="",f.mainSection=i.initMainSection();var g={name:"",section:""};f.newField={name:"",type:1,required:!1,dataType:"Normal"},f.inputList=i.getInputList(),f.sections=[],e.sections={};var p=firebase.database().ref().child("sections"),y=n(p);y.$bindTo(e,"sections"),y.$loaded().then(function(t){e.sections.mainSection?(f.mainSection=angular.copy(e.sections.mainSection),f.mainSection.fields||(f.mainSection.fields=[])):e.sections.mainSection=angular.copy(f.mainSection),e.sections.dynamicSection?f.sections=angular.copy(e.sections.dynamicSection):e.sections.dynamicSection=[]}),t(function(){var e=$(window).height()-90;m.css("height",e)}),f.requireSelection=i.getRequiredSelectionList()}angular.module("main.settings",["ngRoute"]).config(e).controller("settingsCtrl",t),e.$inject=["$routeProvider"],t.$inject=["$scope","$timeout","$firebaseObject","settingsService"]}(),function(){function e(e){e.when("/home",{title:"Home",controller:"homeCtrl",templateUrl:"src/views/home/home.html",controllerAs:"vm"})}function t(e,t,n,i){function o(){c.objectiveSelected&&e.sections.mainSection.objective.options?c.section=e.sections.dynamicSection.filter(function(e){return e.id===c.objectiveSelected.section})[0]:c.section=null}var c=this;c.objectiveSelected=null,c.isBuyTicketForYourSelf=null,c.handleObjectiveChange=o,i.getOrInitCountries(),i.getOrInitIndustryVertical();var a=firebase.database().ref().child("sections"),r=n(a);r.$bindTo(e,"sections"),r.$loaded().then(function(t){e.sections.mainSection||(e.sections.mainSection=angular.copy(c.mainSection)),e.sections.dynamicSection||(e.sections.dynamicSection=[])}),c.sourceList=["Facebook","Twitter","e27.co","Others"]}angular.module("main.home",["ngRoute"]).config(e).controller("homeCtrl",t),e.$inject=["$routeProvider"],t.$inject=["$scope","$timeout","$firebaseObject","settingsService"]}(),function(){"use strict";function e(e){function t(){return{sectionName:"Main Section",sectionDescription:"Your Information",name:{name:"Name",type:1,required:!0},email:{name:"Email",type:"Email",required:!0},fields:[],objective:{name:"Objective",type:"Dropdown",required:!0,options:[]}}}function n(e){var t={name:e,type:"",required:!1,dataType:e};switch(e){case"Amount Raised":t.type=3;break;case"Amount to Raise":t.type=4;break;case"Country":t.type=5;break;case"Industry Vertical":t.type=7;break;case"Round of Funding":t.type=9;break;default:t.type=1}return t}function i(){return[{name:"Required",value:!0},{name:"Optional",value:!1}]}function o(){return[{id:1,name:"Textbox",type:"Normal"},{id:2,name:"Textarea",type:"Normal"},{id:3,name:"Number",type:"Amount Raised"},{id:4,name:"Number",type:"Amount to Raise"},{id:5,name:"Select-2-box (1-value)",type:"Country"},{id:6,name:"Select-2-box (multiple value)",type:"Country"},{id:7,name:"Select-2-box (1-value)",type:"Industry Vertical"},{id:8,name:"Select-2-box (multiple value)",type:"Industry Vertical"},{id:9,name:"Radio",type:"Round of Funding"},{id:10,name:"Dropdown",type:"Round of Funding"},{id:11,name:"Checkbox",type:"Round of Funding"},{id:12,name:"Email",type:"Normal"}]}function c(){if(l.length>0)return l;var t=firebase.database().ref().child("countries"),n=e(t);n.$loaded().then(function(e){return r(n,l),l})}function a(){if(u.length>0)return u;var t=firebase.database().ref().child("IndustryVetical"),n=e(t);n.$loaded().then(function(e){return r(n,u),u})}function r(e,t){for(var n=0;n<e.length;n++)t.push(e[n].$value)}var s={initMainSection:t,getItemDrag:n,getRequiredSelectionList:i,getInputList:o,getOrInitCountries:c,getOrInitIndustryVertical:a},l=[],u=[];return s}angular.module("main").factory("settingsService",e),e.$inject=["$firebaseArray"]}(),function(){"use strict";function e(){var e={restrict:"EA",require:"ngModel",controller:t,templateUrl:"src/directives/input-control.html",scope:{ngModel:"=",type:"@",typeData:"@"},controllerAs:"vm"};return e}function t(e,t){var n=this;"9"!=e.type&&"10"!=e.type&&"11"!=e.type||(n.roundOfFundingList=["Series A","Series B","Series C"])}angular.module("main").directive("eInputControl",e),t.$inject=["$scope","$firebaseArray"]}(),function(){"use strict";function e(){var e={restrict:"EA",controller:t,templateUrl:"src/directives/select-box-control.html",scope:{type:"@"}};return e}function t(e,t){e.dataModel=[];var n=new Date;e.time=""+n.getUTCFullYear()+n.getUTCMonth()+n.getUTCMinutes()+n.getUTCHours()+n.getUTCMinutes()+n.getUTCSeconds()+n.getUTCMilliseconds(),e.loadData=function(t){return 5==e.type||6==e.type?e.countriesData.filter(function(e){return e.toLowerCase().indexOf(t.toLowerCase())>-1}):i.filter(function(e){return e.toLowerCase().indexOf(t.toLowerCase())>-1})},e.tagAdded=function(){if(5==e.type||7==e.type){var t=document.getElementById("select-box-control-"+e.time),n=t.getElementsByTagName("input")[0];n&&(n.disabled=!0,n.placeholder="",n.style.backgroundColor="white")}},e.tagRemoved=function(){if(5==e.type||7==e.type){var t=document.getElementById("select-box-control-"+e.time),n=t.getElementsByTagName("input")[0];n&&(n.disabled=!1,n.placeholder="Select a country")}},e.countriesData=t.getOrInitCountries();var i=t.getOrInitIndustryVertical()}angular.module("main").directive("eSelectBoxControl",e),t.$inject=["$scope","settingsService"]}();