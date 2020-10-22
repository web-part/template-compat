/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 9AE74B1CB034F4745E92BAA7E995A0B3
*
* source file: htdocs/views/master/product/list/Products/dialog/active/Active.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 激活产品对话框。
* 即开通服务。
*/
KISP.panel('/Products/Active', function (require, module, panel) {

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '开通服务',
            'width': 560,
            'resizable': false,
            'z-index': 1023,

            'container': panel,
            'content': Content,
            'footer': Footer

        });

        dialog.on({
            'render': function render() {
                Content.render(meta.company.origin);
                Footer.render();
            }
        });

        API.on({
            'success': function success() {
                dialog.close();
                panel.fire('success');
            }
        });

        Footer.on({
            'submit': function submit() {
                var form = Content.get();

                if (form) {

                    API.post({
                        'company': meta.company,
                        'product': meta.product,
                        'form': form
                    });
                }
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
        meta = data;
        dialog.render();
    });
});