/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 051732590282104A8D8A44FEB7FFC0F4
*
* source file: htdocs/routers/AccountLogs.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AccountLogs', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        }

    };
});