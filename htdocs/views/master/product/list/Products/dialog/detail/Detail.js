
/*
* 产品详情对话框。
*/
KISP.panel('/Products/Detail', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        item: null,
    };


    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '产品详情',
            'width': 650,
            'z-index': 1023,
            'height': 510,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'tid': meta.item.origin['tid'],
                    'prod_id': meta.item.origin['prod_id'],
                });
            },
        });

        API.on({
            'success': function (data) {
                Content.render(data);
                Footer.render();
            },
        });


        Footer.on({
            'ok': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (item) {

        meta.item = item;

        dialog.render();


    });



});





