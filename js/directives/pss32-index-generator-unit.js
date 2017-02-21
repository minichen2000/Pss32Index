(function () {
    'use strict';

    angular
        .module('starter')
        .directive('pss32IndexGeneratorUnit', pss32IndexGeneratorUnit);
    pss32IndexGeneratorUnit.$inject = ['pss32IndexUtil'];
    function pss32IndexGeneratorUnit(pss32IndexUtil) {
        return {
            // can be used as attribute or element
            restrict: 'AE',
            scope: {},
            // which markup this directive generates
            templateUrl: 'js/directives/pss32-index-generator-unit.html',
            replace: true,
            link: function (scope, iElement, iAttrs) {
                scope.data={
                    shelf:1,
                    slot:1,
                    port:1,
                    channel:0,
                    hoOduNumber:0,
                    containerType:0,
                    hoOduType:0,
                    loOduType:0,
                    loOduNumber:0,
                    tcmLevel:0,
                    tcmDirection:0
                };
                scope.shelves = [];
                let i=1;
                for(i=1; i<=64;i++){
                    scope.shelves.push(i);
                }
                scope.slots = [];
                for(i=1; i<=64;i++){
                    scope.slots.push(i);
                }
                scope.ports = [''];
                for(i=1; i<=64;i++){
                    scope.ports.push(i);
                }
                scope.channels = [''];
                for(i=1; i<=2;i++){
                    scope.channels.push(i);
                }
                scope.hoOduNumbers = [''];
                for(i=1; i<=16;i++){
                    scope.hoOduNumbers.push(i);
                }
                scope.loOduNumbers = [''];
                for(i=1; i<=16;i++){
                    scope.loOduNumbers.push(i);
                }
                scope.tcmLevels = [''];
                for(i=1; i<=6;i++){
                    scope.tcmLevels.push(i);
                }
                scope.tcmDirections = ['','AM', 'BM'];
                scope.containerTypes=[
                    '',
                    'HO-ODU NIM',
                    'Client Transparent ODU',
                    'LO-ODU NIM',
                    'ODU-TP',
                    'ODU POOL',
                    'ODU1PTF',
                    'OPTSG'
                ];
                scope.oduTypes=[
                    '',
                    'ODU0',
                    'ODU1',
                    'ODU1e',
                    'ODU1f',
                    'ODU2',
                    'ODU2e',
                    'ODU2f',
                    'ODU3',
                    'ODU3e1',
                    'ODU3e2',
                    'ODU4',
                    'ODUflex(CBR)',
                    'OPTSG',
                    'ODUflex(GFP)'
                ];

                function initVals(){
                    if(scope.data.port==0){
                        scope.data.channel=0;
                    }
                    if(scope.data.port!=0 || scope.data.channel!=0){
                        scope.data.hoOduNumber=0;
                    }
                    if(scope.data.containerType==0){
                        scope.data.hoOduType=0;
                        scope.data.loOduType=0;
                        scope.data.loOduNumber=0;
                    }
                    if(scope.data.hoOduType==0){
                        scope.data.loOduType=0;
                        scope.data.loOduNumber=0;
                    }
                    if(scope.data.loOduType==0){
                        scope.data.loOduNumber=0;
                    }
                }

                scope.calculateResult=function(){
                    initVals();
                    //return JSON.stringify(scope.data, null, 2)+'\n'+pss32IndexUtil.generateIndex(scope.data);
                    return pss32IndexUtil.generateIndex(scope.data);
                };
                scope.checkPort=function(){
                    return scope.data.hoOduNumber==0;
                };
                scope.checkChannel=function(){
                    return scope.data.port!=0 && scope.data.hoOduNumber==0;
                };
                scope.checkHoOdu=function(){
                    return scope.data.port==0;
                };
                scope.checkLoOduType=function(){
                    return scope.data.hoOduType!=0;
                };
                scope.checkHoOduType=function(){
                    return scope.data.containerType!=0;
                };
                scope.checkContainerType=function(){
                    return scope.data.hoOduNumber!=0 || scope.data.channel!=0 || scope.data.port!=0;
                };
                scope.checkLoOduNumber=function(){
                    return scope.data.loOduType!=0;
                };
                scope.checkTcmLevel=function(){
                    return true;
                };
                scope.checkTcmDirection=function(){
                    return scope.data.tcmLevel!=0;
                };

            }
        };
    };
})();
