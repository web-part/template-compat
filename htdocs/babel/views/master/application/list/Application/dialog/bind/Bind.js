/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 1C50588EEEEB44DD6B7C36EA3BC48B07
*
* source file: htdocs/views/master/application/list/Application/dialog/bind/Bind.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 添加产品对话框。
*/
KISP.panel('/Application/Bind', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var Confirm = module.require('Confirm');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0
    });
    var meta = {
        company: null,
        product: null,
        application: null,
        chosedApp: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '绑定账套',
            'width': 670,
            'height': 600,
            'z-index': 1023,
            'resizable': false,
            'container': panel,
            'content': Content,
            'footer': Footer
        });

        dialog.on({
            'render': function render() {
                API.get({
                    'product': meta.product,
                    'application': meta.application,
                    'page': 1,
                    'pagesize': 10
                });
            }
        });

        API.on('success', {
            'get': function get(list, pageinfo) {
                var data = {
                    'list': list,
                    'pageinfo': pageinfo
                };
                Content.render(data, meta.application.bind);
                Footer.render();
            },

            'bind': function bind() {
                dialog.close();
                panel.fire('success');
            }
        });
        Confirm.on({
            'ok': function ok() {
                API.bind({
                    'product': meta.product,
                    'application': meta.application,
                    'accountid': meta.chosedApp.origin.account_id //绑定账套id
                });
            }
        });
        Content.on({
            'page-chose': function pageChose(page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'product': meta.product,
                    'application': meta.application
                });
            }
        });
        Footer.on({
            'ok': function ok() {

                var list = Content.get();
                if (meta.application.bind) {
                    toast.show('已绑定账套且不可更改。');
                    dialog.close();
                    return;
                }
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                meta.chosedApp = list[0];
                Confirm.render();
            },

            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.application = data.application;
        dialog.render();
    });
});