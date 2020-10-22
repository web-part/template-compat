/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F67877804863E8067D1A0392C412D43B
*
* source file: htdocs/routers/AccountUsers.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AccountUsers', function (require, module) {

    //以下两种写法是等价的。
    //如果是写法一，则 KISP 内部也会进一步转换成写法二。
    //写法一简单明了，但写法二功能更自由、丰富。
    //一般情况下用写法一，必要时可用写法二。

    //写法一。
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
        }
    };

    // //写法二。
    // return function (AccountUsers) {
    //     AccountUsers.on({
    //         'company-list': function () {
    //             var Master = module.require('Master');
    //             Master.open('Companys', []);
    //         },

    //         'product-list': function (company) {
    //             var Master = module.require('Master');
    //             Master.open('Products', [{ 'company': company, }]);
    //         },

    //         'account-list': function (data) {
    //             var Master = module.require('Master');
    //             Master.open('Accounts', [data]);
    //         },
    //     });
    // };
});