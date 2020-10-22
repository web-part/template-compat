
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
        updateInfo: null,
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
            'footer': Footer,
        });


        dialog.on({
            'render': function () {
                API.get({
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id': meta.slvId,	//产品添加ID
                });
            },
        });

        API.on('success', {
            'get': function (data) {
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

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });

        Footer.on({
            'ok': function () {
                var list = Content.get();
                var userid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'meta': meta,
                    'userid': userid,
                });
            },

            'cancel': function () {
                dialog.close();
            },
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





