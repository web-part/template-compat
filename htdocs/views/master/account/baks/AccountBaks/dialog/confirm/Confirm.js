
/*
* 删除账套确认对话框。
*/
KISP.panel('/AccountBaks/Confirm', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');

    var dialog = null;

    var meta = {
        action: '',     //动作类型，`delete` 或 `download`。
        account: null,  //账套信息。
    };

    var action$text = {
        'delete': '删除',
        'download': '下载',
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'width': 400,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {

                Content.render({
                    'action': action$text[meta.action],
                    'name': meta.account.name,
                });

                Footer.render();
            },
        });

        Footer.on({
            'ok': function () {
                dialog.close();
                panel.fire(meta.action);
            },

            'cancel': function () {
                dialog.close();
            },
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
        dialog.set('title', `${action$text[action]}账套备份文件`);

    });



    return {
        delete: function (account) {
            panel.render('delete', account);
        },

        download: function (account) {
            panel.render('download', account);
        },
    };


});





