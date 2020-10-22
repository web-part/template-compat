/**
* 
*/
KISP.route('Products', function (require, module) {


    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },
        'app-list': function (data) { 
            var Master = module.require('Master');
            Master.open('Application', [data]);
        },
        'account-list': function (data) {
            var Master = module.require('Master');
            Master.open('Accounts', [data]);
        },

        'account-baks': function (data) {
            var Master = module.require('Master');
            Master.open('AccountBaks', [data]);
        },

        'users': function (data) {
            var Master = module.require('Master');
            Master.open('ProductUsers', [data]);
        },

        'create-account': function (data) {
            var AccountCreate = module.require('AccountCreate');
            AccountCreate.render(data);
        },

        //跳到企业认证页面。
        'auth': function (company) {
            var Master = module.require('Master');
            var data = { 'company': company, };

            Master.set(data);
            Master.open('Auth', [data]);
        },
    };
});
