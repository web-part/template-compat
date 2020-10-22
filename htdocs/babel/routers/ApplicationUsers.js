/*
* babel time: 2020-10-19 16:42:32
*
* source md5: A308A48247175BC416188DEA494AD2DD
*
* source file: htdocs/routers/ApplicationUsers.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('ApplicationUsers', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },
        'product-list': function productList(company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company }]);
        },
        'application-list': function applicationList(data) {
            var Master = module.require('Master');
            Master.open('Application', [data]);
        },
        'add-users': function addUsers(data, application) {
            var Master = module.require('Master');
            Master.open('ApplicationUsers', [{ 'data': data, 'application': application }]);
        }

    };
});