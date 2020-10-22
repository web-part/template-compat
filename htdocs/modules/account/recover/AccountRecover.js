
/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover', function (require, module, panel) {
    var KISP = require('KISP');


    var Footer = module.require('Footer');
    var Content = module.require('Content');

    var API = module.require('API');
    var Dialog = require('Dialog');
    var dialog = null;
    var meta = {};

    panel.on('init', function () {
        dialog = Dialog.panel({
            'title': '恢复账套',
            'width': 900,
            'height': 560,
            'resizable': false,
            'z-index': 1023,

            'container': panel,
            'content': Content,
            'footer': Footer,
        });


        dialog.on({
            'render': function (data) {
                Content.render(meta.product.origin);
                Footer.render();
            },

        });
        API.on({
            'success': function () {
                dialog.close();
                panel.fire('ok', [meta]);
            }
        })
        Footer.on({
            'sure': function () {
                var account = Content.get();
                var data = null;
                if (!account.item.back_name) {
                    return KISP.alert('请选择一项。');
                }
                if (account.nowIndex === 0) {
                    data = {
                        'tid': meta.company.origin.tid,
                        'pid': meta.product.origin.pid,
                        'file_id': account.item['file_id'],
                        'bak_file_path': '',
                        'cloud_type': 'kingdee',
                    }
                } else {
                    data = {
                        'tid': meta.company.origin.tid,
                        'pid': meta.product.origin.pid,
                        'file_id': '',
                        'bak_file_path': account.item['bak_file_path'],
                        'cloud_type': account.item['cloud_type'],
                    }
                }
                API.post(data);
            },
            'cancel': function () {
                dialog.close();
            }
        })

    });



    panel.on('render', function (data) {
        meta = data;
        dialog.render(meta);

        Footer.render();



    });



});





