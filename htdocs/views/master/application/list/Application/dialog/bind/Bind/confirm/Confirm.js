
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
            'footer': Footer,
        });

      
        dialog.on({
            'render': function () {
                Footer.render();
                Content.render();
            },
        });

  


        Footer.on({
            'ok': function () {
                dialog.close();
                panel.fire('ok');
            },
            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function () {
        dialog.render();
       
    });



});





