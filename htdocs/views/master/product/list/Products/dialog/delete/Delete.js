
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
        product: null,
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
            'footer': Footer,
        });

      
        dialog.on({
            'render': function (data) {
                Content.render(data.product);
                Footer.render();
            },
        });

  

        API.on({
            'success': function () {
                dialog.close();
                panel.fire('success');
            },
            'fail': function () {
                dialog.close();
            },
        });


        Footer.on({
            'ok': function () {
                API.post(meta);
            },
            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta = data;
        dialog.render(data);
       
    });



});





