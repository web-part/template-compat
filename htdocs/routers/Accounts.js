/**
* 
*/
KISP.route('Accounts', function (require, module) {


    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function (company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company, }]);
        },

        'add-user': function (data) {
            var Master = module.require('Master');
            Master.open('AccountUsers', [data]);
        },

        'to-baks': function (data) {
            var Master = module.require('Master');
            Master.open('AccountBaks', [data]);
        },

        'create-account': function (data) {
            var AccountCreate = module.require('AccountCreate');
            AccountCreate.render(data);
        },
        'recover-account': function (data) {
            var AccountRecover = module.require('AccountRecover');
            AccountRecover.render(data);
        },

        //第三方登录成功。
        'third-login': function (user) {
            var Login = module.require('Login');
            Login.done(user);
        },

        //这个暂时不用了。 先留着吧。 
        'apps': function (data) {
            var Master = module.require('Master');
            Master.open('AccountApps', [data]);
        },

        /**
        * 打开对应的账套。
        *   data = {
        *       tid: '',        //必选，企业 id。
        *       acctid: '',     //必选，账套 id。
        *   };
        */
        'open': function (data) {
            var AccountPlugin = require('AccountPlugin');
            AccountPlugin.open(data);
        },

        /**
        * 打开第三方应用。
        */
        'url': function (url) {
            //location.href = url;
            window.open(url);   //打开新窗口，可能会给浏览器拦截。
        },

    };
});
