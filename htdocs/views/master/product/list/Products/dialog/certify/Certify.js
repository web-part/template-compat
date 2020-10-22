
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
        product: null,
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
            'footer': Footer,
        });


        dialog.on({
            'render': function (data) {
                Content.render(data);
                Footer.render();
            },
        });

        Footer.on({
            'cancel': function () {
                dialog.close();
            },

            'ok': function () {
                dialog.close();

                panel.fire('ok');
            },
        });

    });


    panel.on('render', function (msg) {
        dialog.render(msg);
        
    });



});





