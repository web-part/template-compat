/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 899A499CF2FC9BB896F574A1815CFD06
*
* source file: htdocs/views/master/product/list/Products/dialog/detail/Detail.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 产品详情对话框。
*/
KISP.panel('/Products/Detail', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        item: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '产品详情',
            'width': 650,
            'z-index': 1023,
            'height': 510,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render() {
                API.get({
                    'tid': meta.item.origin['tid'],
                    'prod_id': meta.item.origin['prod_id']
                });
            }
        });

        API.on({
            'success': function success(data) {
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

    panel.on('render', function (item) {

        meta.item = item;

        dialog.render();
    });
});