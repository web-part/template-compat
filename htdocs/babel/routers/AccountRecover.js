/*
* babel time: 2020-10-19 16:42:32
*
* source md5: A872F4BBE83A7258A153B7307D6B75AA
*
* source file: htdocs/routers/AccountRecover.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AccountRecover', function (require, module) {

    return {

        'ok': function ok(data) {
            var Master = module.require('Master');
            Master.open('Accounts', [data]);
        }

    };
});