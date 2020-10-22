
/*
* 添加产品对话框。
*/
KISP.panel('/Application/Manage', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var meta = {
        company: null,
        product: null,
        application: null,
    };
    var numInfo = {};

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '用户管理',
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
                API.getNum({
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id':meta.application.origin.slv_prod_id,
                });

            },
        });

        API.on('success', {
            'get-num': function (data) {
                numInfo = data;
                API.get({
                    'page': 1,
                    'pagesize': 10,
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id':meta.application.origin.slv_prod_id,
                });
            },
            'get': function (data, pageinfo) {
                Content.render(numInfo, data, pageinfo);
                Footer.render();
            },

            'post': function () {
                dialog.close();
                panel.fire('success');
            },
        });

        Content.on({
            'page-chose': function (page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'tid': meta.product.origin.tid,	//企业id
                    'prod_id': meta.product.origin.prod_id,	//产品实例id
                    'slv_prod_id':meta.application.origin.slv_prod_id,                    
                });
            }
        })
        Footer.on({
            'ok': function () {
                var list = Content.get();
                var userid = list.join();
                if (!list.length) {
                    return KISP.alert('请至少选择一项。');
                }
                API.post({
                    'meta': meta,
                    'user': userid,
                });
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.application = data.application;
        dialog.render();

    });



});





