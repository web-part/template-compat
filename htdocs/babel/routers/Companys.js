/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F4710DB84CBEB83A032B57DE120577DF
*
* source file: htdocs/routers/Companys.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Companys', function (require, module) {

    return {
        'item': function item(company) {
            var Master = module.require('Master');
            var data = { 'company': company };

            Master.set(data);
            Master.open('Products', [data]);
        },

        'add-company': function addCompany() {
            var Master = module.require('Master');
            Master.open('AddCompanys');
        },

        'auth': function auth(company) {
            var Master = module.require('Master');
            var data = { 'company': company };

            Master.set(data);
            Master.open('Auth', [data]);
        },
        'no-company': function noCompany() {
            var Master = module.require('Master');

            Master.open('AddCompanys');
        }
    };
});