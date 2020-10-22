/*
* babel time: 2020-10-19 16:41:37
*
* source md5: ABEAC90B2D45DF43281D08FC99C23D0F
*
* source file: htdocs/views/master/application/list/Application/dialog/add/Add.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 添加产品对话框。
*/
KISP.panel('/Application/Add', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        application: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '添加应用',
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
                    'page': 1,
                    'pagesize': 10,
                    'tid': meta.product.origin.tid, //企业id
                    'prod_id': meta.product.origin.prod_id //产品实例id
                });
            }
        });

        API.on('success', {
            'get': function get(data, pageinfo) {
                data.forEach(function (item, index) {
                    meta.application.forEach(function (appitem, num) {
                        if (item.origin.slv_icrm_id === appitem.origin.slv_icrm_id) {
                            item.chosed = true;
                        }
                    });
                });

                Content.render(data, pageinfo);

                Footer.render();
            },

            'post': function post() {
                dialog.close();
                panel.fire('success');
            }
        });

        Content.on({
            'page-chose': function pageChose(page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'tid': meta.product.origin.tid, //企业id
                    'prod_id': meta.product.origin.prod_id //产品实例id
                });
            }
        });
        Footer.on({
            'ok': function ok() {
                var list = Content.get();
                var icrmid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'product': meta.product,
                    'application': icrmid
                });
            },

            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.application = data.application;
        dialog.render();
    });
});