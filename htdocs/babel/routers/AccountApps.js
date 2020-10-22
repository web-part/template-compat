/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 8DABEEF1A1FD541FA73576620290CABE
*
* source file: htdocs/routers/AccountApps.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AccountApps', function (require, module) {

    return {

        'company-list': function companyList() {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function productList(company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company }]);
        },

        'account-list': function accountList(data) {
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
        'product': function product(data) {
            var AccountPlugin = require('AccountPlugin');
            AccountPlugin.open(data);
        },

        /**
        * 打开第三方应用。
        *
        */
        'url': function url(_url) {
            //location.href = url;
            window.open(_url); //打开新窗口，可能会给浏览器拦截。
        }

    };
});