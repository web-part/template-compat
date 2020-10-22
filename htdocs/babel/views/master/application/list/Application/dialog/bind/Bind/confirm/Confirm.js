/*
* babel time: 2020-10-19 16:41:37
*
* source md5: E5833857F55B657EF17EAB996CB30235
*
* source file: htdocs/views/master/application/list/Application/dialog/bind/Bind/confirm/Confirm.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 删除账套确认对话框。
*/
KISP.panel('/Application/Bind/Confirm', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');
    var dialog = null;

    // var meta = {
    //     account: null,  //账套信息。
    // };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '信息提示',
            'width': 400,
            //'height': 416,
            'z-index': 1024,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render() {
                Footer.render();
                Content.render();
            }
        });

        Footer.on({
            'ok': function ok() {
                dialog.close();
                panel.fire('ok');
            },
            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function () {
        dialog.render();
    });
});