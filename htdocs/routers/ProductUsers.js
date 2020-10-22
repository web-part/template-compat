/**
* 
*/
KISP.route('ProductUsers', function (require, module) {

    //以下两种写法是等价的。
    //如果是写法一，则 KISP 内部也会进一步转换成写法二。
    //写法一简单明了，但写法二功能更自由、丰富。
    //一般情况下用写法一，必要时可用写法二。

    //写法一。
    return {
        'company-list': function () {
            var Master = module.require('Master');
            Master.open('Companys', []);
        },

        'product-list': function (company) {
            var Master = module.require('Master');
            Master.open('Products', [{ 'company': company, }]);
        },

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
