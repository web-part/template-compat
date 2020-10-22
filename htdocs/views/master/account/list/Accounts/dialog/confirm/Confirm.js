
/*
* 删除账套确认对话框。
*/
KISP.panel('/Accounts/Confirm', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        account: null,  //账套信息。
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
            'footer': Footer,
        });

      
        dialog.on({
            'render': function (account) {
                Content.render(account);
                Footer.render();
            },
        });

  


        Footer.on({
            'ok': function () {
                dialog.close();
                panel.fire('ok', [meta.account]);
            },
            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (account) {
        meta.account = account;
        dialog.render(account);
       
    });



});





