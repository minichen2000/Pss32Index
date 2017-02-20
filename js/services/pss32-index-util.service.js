(function () {
    'use strict';

    angular
        .module('starter')
        .factory('pss32IndexUtil', pss32IndexUtil);

    pss32IndexUtil.$inject = ['logger'];


    function pss32IndexUtil(logger) {
        var ODUTYPE=[
            'NULL',
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
        var CONTAINERTYPE=[
            'NULL',
            'Line',//'HO-ODU NIM'
            'Client', //'Client Transparent ODU',
            'Line', //'LO-ODU NIM',
            'Line', //'ODU-TP',
            'ODU POOL',
            'ODU1PTF', //'ODU1PTF (11dpm12/4qpa8 specific)',
            'OPTSG'
        ];

        var service = {
            validatePss32Index: validatePss32Index,
            parseCompleteLegalIndices: parseCompleteLegalIndices
        };
        return service;

        function parseCompleteLegalIndices(sections){
            var error_mark="ERROR!";
            var rlt=error_mark;
            var data=parseTheFourPartsOfMainIndex(sections[0]);
            if(!data){
                return rlt;
            }
            if(data.shelf<1 || data.slot<1){
                return rlt;
            }else{
                rlt=""+data.shelf+'-'+data.slot;
                if(data.port<1 && data.thridPart13bitValue<1){
                    rlt+=error_mark;
                    return rlt;
                }else{
                    if(data.port>0){
                        //regular shelf-slot-port
                        rlt+=('-'+data.port);
                        if(data.remaining>0){
                            var ch=data.remaining>>>4;
                            rlt+=(' CH='+ch);
                        }
                    }else{
                        //thridPart13bitValue
                        rlt+=' HOODU='+data.thridPart13bitValue;
                    }
                    rlt+=' ';
                    if(sections.length>1){
                        var d=parseOduPart(sections[1]);
                        if(d.containerType>0){
                            rlt+=(' '+CONTAINERTYPE[d.containerType])
                        }
                        if(d.hoOduType>0){
                            rlt+=(' '+ODUTYPE[d.hoOduType])
                        }
                        if(d.loOduType>0){
                            rlt+=(' '+ODUTYPE[d.loOduType])
                        }
                        if(d.loOduId>0){
                            rlt+=('='+d.loOduId)
                        }
                        if(d.tcmLevel>0){
                            rlt+=(' TCM level='+d.tcmLevel)
                        }
                        if(d.tcmDir>0){
                            rlt+=(d.tcmDir==1 ? ' AM' : ' BM')
                        }
                    }
                    return rlt;
                }
            }
        }



        function parseOduPart(index){
            var loOduType=index&0b11111;
            var hoOduType=index>>>5&0b11111;
            var containerType=index>>>10&0b111111;
            var loOduId=index>>>16&0b111111111;
            var tcmDir=index>>>27&0b11;
            var tcmLevel=index>>>29&0b111;
            return {
                "loOduType": loOduType,
                "hoOduType": hoOduType,
                "containerType": containerType,
                "loOduId": loOduId,
                "tcmDir": tcmDir,
                "tcmLevel": tcmLevel
            }
        }
        function parseTheFourPartsOfMainIndex(index){
            var shelf=index>>>24;
            var slot=index>>>16&0xff;
            var port=index>>>8&0xff;
            var remaining=index&0xff;
            var thridPart13bitValue=(index&0xffff)>>>3;
            return {
                "shelf": shelf,
                "slot": slot,
                "port": port,
                "remaining": remaining,
                "thridPart13bitValue": thridPart13bitValue
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
