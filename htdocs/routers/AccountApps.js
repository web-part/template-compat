/**
* 
*/
KISP.route('AccountApps', function (require, module) {


    return {

        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function (company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company, }]);
        },

        'account-list': function (data) {
            var Master = module.require('Master');
            Master.open('Accounts', [data]);
        },


        /**
        * 点击了产品信息，打开对应的账套。
        *   data = {
        *       tid: '',        //必选，企业 id。
        *       acctid: '',     //必选，账套 id。
        *   };
        */
        'product': function (data) {
            var AccountPlugin = require('AccountPlugin');
            AccountPlugin.open(data);
        },

        /**
        * 打开第三方应用。
        *
        */
        'url': function (url) {
            //location.href = url;
            window.open(url);   //打开新窗口，可能会给浏览器拦截。
        },

       

    };
});
