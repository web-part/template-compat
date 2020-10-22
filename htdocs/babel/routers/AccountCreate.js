/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 1A29B6B8E38C129148C798AE9A758683
*
* source file: htdocs/routers/AccountCreate.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AccountCreate', function (require, module) {

    return {
        //账套创建成功。
        'success': function success(data) {
            var Master = module.require('Master');
            Master.open('Accounts', [data]);
        }

        //'customize': function (data) {
        //    var CustomizePeriod = module.require('CustomizePeriod');
        //    CustomizePeriod.render(data);
        //},

    };
});