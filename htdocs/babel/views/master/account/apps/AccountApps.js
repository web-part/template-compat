/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 8A0BF83FC6856F20663D97B6A465FB90
*
* source file: htdocs/views/master/account/apps/AccountApps.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 某个账套下的应用列表。
* 其实是某个账套所属的产品下的应用列表。
*/
KISP.view('/AccountApps', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');

    var meta = {
        company: null,
        product: null,
        account: null
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
            //点击了产品信息，打开对应的账套。
            'product': function product(data) {
                view.fire('product', [data]);
            },

            //获取应用的跳转地址成功。
            'url': function url(_url) {
                view.fire('url', [_url]);
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //必选，企业信息。
    *       product: {},    //必选，产品信息。
    *       account: {},    //必选，账套信息。
    *   };
    */
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data.account.origin);
    });
});