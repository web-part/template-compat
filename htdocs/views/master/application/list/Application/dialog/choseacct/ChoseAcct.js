
/*
* 添加产品对话框。
*/
KISP.panel('/Application/ChoseAcct', function (require, module, panel) {
    var KISP = require('KISP');

    var Content = module.require('Content');
    var Footer = module.require('Footer');
    var API = module.require('API');

    var Dialog = require('Dialog');
    var dialog = null;

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });
    var meta = {
        company: null,
        product: null,
        application: null,
    };
    var nowApplication = {};
    var nowChosed = {}; //当前选中的项账套

    panel.on('init', function () {

        dialog = Dialog.panel({
            'title': '选择账套',
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
                    'product': meta.product,
                    'page': 1,
                    'pagesize': 10,
                });
            },
        });

        API.on('success', {
            'get': function (list, pageinfo) {
                var data = {
                    'list': list,
                    'pageinfo': pageinfo,
                }
                Content.render(data, nowChosed);
                Footer.render();
            },
        });

        Content.on({
            'page-chose': function (page) {
                API.get({
                    'page': page.no,
                    'pagesize': page.size,
                    'product': meta.product,
                });
            }
        })
        Footer.on({
            'ok': function () {
                dialog.close();

                var list = Content.get();
                nowChosed = list[0];

                if (!list.length) {
                    return KISP.alert('请选择一项。');
                }
                panel.fire('chosed-account', [list[0], meta.application]);
            },

            'cancel': function () {
                dialog.close();
            },
        });

    });


    panel.on('render', function (data) {
        meta.company = data.meta.company;
        meta.product = data.meta.product;
        meta.application = data.application;
        if (nowApplication.origin && (nowApplication.origin.slv_prod_id != meta.application.origin.slv_prod_id)) {
            nowChosed = {};  //换一个应用选账套时清空上次已选账套
        }
        nowApplication = meta.application;
        dialog.render();

    });



});





