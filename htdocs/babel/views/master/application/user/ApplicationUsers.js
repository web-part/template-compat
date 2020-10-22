/*
* babel time: 2020-10-19 16:41:38
*
* source md5: C09E21F9BD04DB96171F5D3625876E8C
*
* source file: htdocs/views/master/application/user/ApplicationUsers.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 某个账套下的用户列表。
*/
KISP.view('/ApplicationUsers', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Selector = module.require('Selector');

    var meta = {
        company: null,
        product: null,
        application: null
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

            //跳到应用列表。
            'application-list': function applicationList() {

                view.fire('application-list', [{
                    'company': meta.company,
                    'product': meta.product
                }]);
            },

            //刷新。
            'refresh': function refresh() {
                Header.render(meta);
                Main.render(meta);
            },

            //添加应用。
            'add-users': function addUsers() {
                Selector.render(meta);
            }

        });

        Main.on({
            'selector': function selector() {
                Selector.render(meta);
            },
            'render': function render(list) {
                meta.list = list; //用于添加用户时 已存在的账套用户列表。
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
    *       application: {},    //账套信息。
    *   };
    */
    view.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.application = data.application;
        Header.render(meta);
        Main.render(meta);
    });
});