/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 0EFF896736C94587ECE99E0FD62591AE
*
* source file: htdocs/routers/AccountBaks.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AccountBaks', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function productList(company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company }]);
        }

    };
});