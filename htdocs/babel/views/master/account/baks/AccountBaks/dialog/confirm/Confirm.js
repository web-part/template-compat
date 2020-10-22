/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 32A45ED516B71C1630C51D95A2ADF09E
*
* source file: htdocs/views/master/account/baks/AccountBaks/dialog/confirm/Confirm.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 删除账套确认对话框。
*/
KISP.panel('/AccountBaks/Confirm', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');

    var dialog = null;

    var meta = {
        action: '', //动作类型，`delete` 或 `download`。
        account: null //账套信息。
    };

    var action$text = {
        'delete': '删除',
        'download': '下载'
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'width': 400,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render() {

                Content.render({
                    'action': action$text[meta.action],
                    'name': meta.account.name
                });

                Footer.render();
            }
        });

        Footer.on({
            'ok': function ok() {
                dialog.close();
                panel.fire(meta.action);
            },

            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    /**
    * 
    *   action: '',     //动作类型，`delete` 或 `download`。
    *   account: {},    //账套备份信息。
    */
    panel.on('render', function (action, account) {
        meta.action = action;
        meta.account = account;

        dialog.render();
        dialog.set('title', action$text[action] + '\u8D26\u5957\u5907\u4EFD\u6587\u4EF6');
    });

    return {
        delete: function _delete(account) {
            panel.render('delete', account);
        },

        download: function download(account) {
            panel.render('download', account);
        }
    };
});