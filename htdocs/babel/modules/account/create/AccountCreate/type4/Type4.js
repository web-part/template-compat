/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 8F74FA6F12C44B07552B52C6FE22F4BB
*
* source file: htdocs/modules/account/create/AccountCreate/type4/Type4.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 旗舰版。
*/
KISP.panel('/AccountCreate/Type4', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');

    var Dialog = require('Dialog');
    var dialog = null;

    panel.set('show', false);

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '创建账套',
            'width': 560,
            'height': 490,
            'resizable': false,
            'z-index': 1023,

            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render(data) {
                Content.render(data);
                Footer.render();
            }

        });

        Footer.on({

            'create': function create() {
                var data = Content.get();
                //说明有数据非法。
                if (!data) {
                    return;
                }

                panel.fire('submit', [data]);
            }
        });
    });

    /**
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        dialog.render(data);
    });

    return {
        close: function close() {
            dialog.close();
        }
    };
});