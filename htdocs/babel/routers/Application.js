/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 9790D4E649713FF42189A6FA4BF3FED2
*
* source file: htdocs/routers/Application.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Application', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },
        'product-list': function productList(company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company }]);
        },
        'add-users': function addUsers(data) {
            var Master = module.require('Master');
            Master.open('ApplicationUsers', [data]);
        }
    };
});