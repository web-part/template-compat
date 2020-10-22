/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 230D14894A77D58E998CABB901CF76F5
*
* source file: htdocs/views/master/product/list/Products/dialog/add/Add.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

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
        company: null
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
            'footer': Footer
        });

        dialog.on({
            'render': function render() {
                API.get(meta.company);
            }
        });

        API.on('success', {
            'get': function get(data) {
                Content.render(data);
                Footer.render();
            },

            'post': function post() {
                dialog.close();
                panel.fire('success');
            }
        });

        Footer.on({
            'submit': function submit() {
                var form = Content.get();

                API.post({
                    'company': meta.company,
                    'form': form
                });
            }
        });
    });

    panel.on('render', function (company) {
        meta.company = company;
        dialog.render();
    });
});