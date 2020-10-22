/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 09568AB9E1D27DC5E41AF1DFB25BF15C
*
* source file: htdocs/views/master/application/list/Application/dialog/purchase/Purchase.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 添加产品对话框。
*/
KISP.panel('/Application/Purchase', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        application: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '购买详情',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render() {
                API.get({
                    'tid': meta.product.origin.tid, //企业id
                    'prod_id': meta.product.origin.prod_id, //产品实例id
                    'slv_prod_id': meta.application.origin.slv_prod_id //产品添加ID
                });
            }
        });

        API.on('success', {
            'get': function get(data) {
                Content.render(data);
                Footer.render();
            }

        });

        Footer.on({
            'ok': function ok() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.application = data.application;
        dialog.render();
    });
});