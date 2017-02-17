/**
 * Created by Chen on 2016/4/20.
 */
(function () {
    'use strict';

    angular
        .module('starter')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$scope', 'pss32IndexUtil', 'logger'];
    function MainController($http, $scope, pss32IndexUtil, logger) {
        var vm = this;
        vm.parserCount=[];
        var parserIndex=0;
        function addParser(){
            vm.parserCount.push(parserIndex++);
        }


        vm.onAdd=function(){
            addParser();
        };
        addParser();

    }
})();

