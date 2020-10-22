
/*
* 添加产品对话框。
*/
KISP.panel('/Products/Add', function (require, module, panel) {
    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '添加产品',
            'width': 720,
             //'height': 416,
            'z-index': 1023,
            'resizable': false,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });

      
        dialog.on({
            'render': function () {
                API.get(meta.company);
            },
        });

        API.on('success', {
            'get': function (data) {
                Content.render(data);
                Footer.render();
            },

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });


        Footer.on({
            'submit': function () {
                var form = Content.get();

                API.post({
                    'company': meta.company,
                    'form': form,
                });
            },
        });

    });


    panel.on('render', function (company) {
        meta.company = company;
        dialog.render();
       
    });



});





