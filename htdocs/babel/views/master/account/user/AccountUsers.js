/*
* babel time: 2020-10-19 16:41:37
*
* source md5: CBE04497EFDF0D09330B70B552E7B35E
*
* source file: htdocs/views/master/account/user/AccountUsers.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 某个账套下的用户列表。
*/
KISP.view('/AccountUsers', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Selector = module.require('Selector');

    var meta = {
        company: null,
        product: null,
        account: null,
        list: []
    };

    view.on('init', function () {

        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function companyList() {
                view.fire('company-list');
            },

            //跳到产品列表，传企业信息过去。
            'product-list': function productList() {
                view.fire('product-list', [meta.company]);
            },

            //跳到账套列表。
            'account-list': function accountList() {
                view.fire('account-list', [{
                    'company': meta.company,
                    'product': meta.product
                }]);
            },

            //刷新。
            'refresh': function refresh() {
                Main.render(meta);
            }

        });

        Main.on({
            'selector': function selector() {
                Selector.render(meta);
            },
            'render': function render(list) {
                meta.list = list;
            }
        });

        Selector.on({
            'ok': function ok() {
                Main.render(meta);
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *       account: {},    //账套信息。
    *   };
    */
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data);
    });
});