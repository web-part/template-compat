/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 72836D3CC4E8CF957009306414939F81
*
* source file: htdocs/views/master/product/list/Products/dialog/certify/Certify.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Products/Certify', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '提示',
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
                Content.render(data);
                Footer.render();
            }
        });

        Footer.on({
            'cancel': function cancel() {
                dialog.close();
            },

            'ok': function ok() {
                dialog.close();

                panel.fire('ok');
            }
        });
    });

    panel.on('render', function (msg) {
        dialog.render(msg);
    });
});