/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 237DE247DD92495A722A6EE37F478B84
*
* source file: htdocs/views/master/product/list/Products/dialog/delete/Delete.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 删除产品对话框。
*/
KISP.panel('/Products/Delete', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '删除产品',
            'width': 400,
            //'height': 416,
            'z-index': 1023,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render(data) {
                Content.render(data.product);
                Footer.render();
            }
        });

        API.on({
            'success': function success() {
                dialog.close();
                panel.fire('success');
            },
            'fail': function fail() {
                dialog.close();
            }
        });

        Footer.on({
            'ok': function ok() {
                API.post(meta);
            },
            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (data) {
        meta = data;
        dialog.render(data);
    });
});