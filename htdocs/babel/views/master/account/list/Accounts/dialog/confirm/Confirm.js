/*
* babel time: 2020-10-19 16:41:37
*
* source md5: A4D824E6CB1405041DC24CEFF59E5923
*
* source file: htdocs/views/master/account/list/Accounts/dialog/confirm/Confirm.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 删除账套确认对话框。
*/
KISP.panel('/Accounts/Confirm', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        account: null //账套信息。
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '删除账套',
            'width': 400,
            //'height': 416,
            'z-index': 1023,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render(account) {
                Content.render(account);
                Footer.render();
            }
        });

        Footer.on({
            'ok': function ok() {
                dialog.close();
                panel.fire('ok', [meta.account]);
            },
            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (account) {
        meta.account = account;
        dialog.render(account);
    });
});