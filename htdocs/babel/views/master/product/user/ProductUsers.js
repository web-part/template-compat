/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 6B30FE38C6E944F6F603EE18B9EF4347
*
* source file: htdocs/views/master/product/user/ProductUsers.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 某个产品下的在线用户列表。
*/
KISP.view('/ProductUsers', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');

    var meta = {
        company: null,
        product: null
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

            //刷新。
            'refresh': function refresh() {
                Main.refresh();
            }

        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    view.on('render', function (data) {

        meta = data;

        Header.render(data);
        Main.render(data);
    });
});