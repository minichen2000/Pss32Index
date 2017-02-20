(function () {
    'use strict';

    angular
        .module('starter')
        .directive('pss32IndexParserUnit', pss32IndexParserUnit);
    pss32IndexParserUnit.$inject = ['pss32IndexUtil'];
    function pss32IndexParserUnit(pss32IndexUtil) {
        return {
            // can be used as attribute or element
            restrict: 'AE',
            scope: {},
            // which markup this directive generates
            templateUrl: 'js/directives/pss32-index-parser-unit.html',
            replace: true,
            link: function (scope, iElement, iAttrs) {
                scope.valid=function(){
                    return false!=pss32IndexUtil.validatePss32Index(scope.snmpIndex);
                };
                scope.calculateResult=function(){
                    var numbers=pss32IndexUtil.validatePss32Index(scope.snmpIndex);
                    return pss32IndexUtil.parseCompleteLegalIndices(numbers);
                }
            }
        };
    };
})();
