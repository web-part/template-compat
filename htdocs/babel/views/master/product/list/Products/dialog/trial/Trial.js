/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 144A2D8370E2ACC05E5B3D95EE84473D
*
* source file: htdocs/views/master/product/list/Products/dialog/trial/Trial.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

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
        product: null
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
            'footer': Footer
        });

        dialog.on({
            'render': function render(data) {

                Content.render(data.status);

                Footer.render();
            }
        });

        API.on({
            'success': function success(msg) {
                KISP.alert(msg, function () {
                    dialog.close();

                    panel.fire('success');
                });
            },

            'fail': function fail() {
                dialog.close();
            },

            'certify': function certify(msg) {
                panel.fire('certify', [msg]);
            }
        });

        Footer.on({
            'ok': function ok() {
                dialog.close();

                API.post(meta.product);
            },

            'go': function go() {
                dialog.close();
                panel.fire('auth');
            }
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
                'status': status
            });

            return;
        }

        panel.$.addClass('no-dialog');
        API.post(meta.product);
    });
});