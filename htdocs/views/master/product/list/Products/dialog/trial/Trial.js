
/*
* 试用产品对话框。
*/
KISP.panel('/Products/Trial', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
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

                Content.render(data.status);

                Footer.render();
            },
        });



        API.on({
            'success': function (msg) {
                KISP.alert(msg, function () {
                    dialog.close();

                    panel.fire('success');
                })
            },

            'fail': function () {
                dialog.close();
            },

            'certify': function (msg) {
                panel.fire('certify', [msg]);
            },
        });


        Footer.on({
            'ok': function () {
                dialog.close();

                API.post(meta.product);
            },

            'go': function () {
                dialog.close();
                panel.fire('auth');
            },
        });

    });


    /**
    * 
    *   opt = {
    *       company: {},       //
    *       product: {},      //
    *   };
    */
    panel.on('render', function (opt) {
        meta.product = opt.product;


        var status = opt.company.origin['org_status'];

        if (status == 0 || status == 3) {
            dialog.render({
                'status': status,
            });

            return;
        }


        panel.$.addClass('no-dialog');
        API.post(meta.product);

    });



});





