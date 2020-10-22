/*
* babel time: 2020-10-19 16:42:32
*
* source md5: A6F3050D10E2678017B380D4B3184FA6
*
* source file: htdocs/routers/Auth.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Auth', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        }

    };
});