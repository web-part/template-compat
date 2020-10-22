/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 838E1252731909D31C2EA04C3C59A0C0
*
* source file: htdocs/views/master/application/list/Application/dialog/forbidden/Forbidden.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 添加产品对话框。
*/
KISP.panel('/Application/Forbidden', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        slvId: null,
        updateInfo: null
    };

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '信息提示',
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
                    'tid': meta.product.origin.tid, //企业id
                    'prod_id': meta.product.origin.prod_id, //产品实例id
                    'slv_prod_id': meta.slvId //产品添加ID
                });
            }
        });

        API.on('success', {
            'get': function get(data) {
                // data.forEach(function (item, index) {
                //     meta.application.forEach(function (appitem, num) {
                //         if (item.origin.slv_icrm_id === appitem.origin.slv_icrm_id) {
                //             item.chosed = true;
                //         }
                //     })
                // });


                Content.render(data, meta.updateInfo);
                Footer.render();
            },

            'post': function post() {
                dialog.close();
                panel.fire('success');
            }
        });

        Footer.on({
            'ok': function ok() {
                var list = Content.get();
                var userid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'meta': meta,
                    'userid': userid
                });
            },

            'cancel': function cancel() {
                dialog.close();
            }
        });
    });

    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.slvId = data.slvId;
        meta.updateInfo = data.updateInfo;
        dialog.render();
    });
});