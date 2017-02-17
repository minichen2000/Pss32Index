(function () {
    'use strict';

    angular
        .module('starter')
        .factory('pss32IndexUtil', pss32IndexUtil);

    pss32IndexUtil.$inject = ['logger'];


    function pss32IndexUtil(logger) {

        var service = {
            validatePss32Index: validatePss32Index,
            parsePortOrOthIndex: parsePortOrOthIndex
        };
        return service;


        function parsePortOrOthIndex(index){
            var shelf=index>>>24;
            var slot=index>>>16&0x00ff;
            var port=index>>>8&0x00ffff;
            return {
                "shelf": shelf,
                "slot": slot,
                "port": port
            };
        }

        function validateSinglePss32Index(index){
            if(undefined==index || ''==index || 0==index.indexOf('0')) return false;
            var r = /^\+?[1-9][0-9]*$/;　　//正整数
            return r.test(index) && Number(index)<0xffffffff;
        }
        function validatePss32Index(index) {
            if(undefined==index || ''==index || 0==index.indexOf('0')) return false;
            var sections=index.split('.');
            switch(sections.length){
                case 1:
                    if(validateSinglePss32Index(sections[0])){
                        return [Number(sections[0])];
                    }else{
                        return false;
                    }
                    break;
                case 2:
                    if(validateSinglePss32Index(sections[0])&&validateSinglePss32Index(sections[1])){
                        return [Number(sections[0]), Number(sections[1])];
                    }else{
                        return false;
                    }
                    break;
                default:
                    return false;
                    break;
            }
        }
    }


})();
