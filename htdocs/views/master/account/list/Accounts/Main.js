
/*
* 
*/
KISP.panel('/Accounts/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');

    var meta = {
        company: null,
        product: null,
    };




    panel.on('init', function () {

        List.on({
            'create-account': function () {
                panel.fire('create-account');
            },

            'save': function (item, value) {
                API.save(item, value);
            },

            'users': function (item) {
                panel.fire('users', [item]);
            },

            'delete': function (item) {
                API.checkUser({
                    'tid': meta.company.origin['tid'],
                    'item': item,
                });
            },

            //禁用或启用账套。
            'set-status': function (item, index, enabled) {
                API.setStatus({
                    'enabled': enabled,
                    'company': meta.company,
                    'account': item,
                    'index': index,
                });
            },

            'manual-bak': function (item) {
                API.manualBak({
                    'company': meta.company,
                    'account': item,
                });
            },

            'auto-bak': function (item, index) {
                var enabled = item.origin['is_back_up'] == 1;

                API.setAutoBak({
                    'company': meta.company,
                    'account': item,
                    'enabled': !enabled,        //这里取反。
                    'index': index,
                });
            },

            'refresh': function (item, index) {
                //恢复中的。
                if (item.status == 7 || item.status == 8) {
                    API.refresh(meta, item.origin['account_id']);
                }
                else { //其它的
                    API.getList(meta);
                }
            },

            'apps': function (item) {
                panel.fire('apps', [item]);
            },

        });

       

        API.on('get', {
            'list': function (list) {
                List.render(list, meta.product.status);
            },
        });

        API.on('set', {
            'status': function (opt) {
                List.setStatus(opt.index, opt.enabled);
            },

            'manual-bak': function () {
                var msg =
                    '操作完成。 <br /> ' +
                    '是否进入账套备份列表查看账套备份状态';

                KISP.confirm(msg, function () {
                    panel.fire('to-baks');
                });
            },

            'auto-bak': function (opt) {
                List.setAutoBakStatus(opt.index, opt.enabled);
            },
        });


        API.on({
            'check-user': function (opt) {
                panel.fire('check-user', [opt.item]);
            },
            'check-recover': function () {
                panel.fire('check-recover');
            },

            'save': function (opt) {
                API.getList(meta);
            },

            'has-refresh': function () {
                API.getList(meta);
            },
        });


    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        meta = data;
        API.getList(data);
    });





    return {
        'checkRecover': API.checkRecover,
    };

});





