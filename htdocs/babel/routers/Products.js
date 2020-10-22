/*
* babel time: 2020-10-19 16:42:32
*
* source md5: DDCEA6A41191D46DB5FD102DF1D1AF64
*
* source file: htdocs/routers/Products.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Products', function (require, module) {

    return {
        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },
        'app-list': function appList(data) {
            var Master = module.require('Master');
            Master.open('Application', [data]);
        },
        'account-list': function accountList(data) {
            var Master = module.require('Master');
            Master.open('Accounts', [data]);
        },

        'account-baks': function accountBaks(data) {
            var Master = module.require('Master');
            Master.open('AccountBaks', [data]);
        },

        'users': function users(data) {
            var Master = module.require('Master');
            Master.open('ProductUsers', [data]);
        },

        'create-account': function createAccount(data) {
            var AccountCreate = module.require('AccountCreate');
            AccountCreate.render(data);
        },

        //������ҵ��֤ҳ�档
        'auth': function auth(company) {
            var Master = module.require('Master');
            var data = { 'company': company };

            Master.set(data);
            Master.open('Auth', [data]);
        }
    };
});