/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 35776E63CC70CF82958F1F885AC99077
*
* source file: htdocs/views/master/account/list/Accounts/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Accounts/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');

    var meta = {
        company: null,
        product: null
    };

    panel.on('init', function () {

        List.on({
            'create-account': function createAccount() {
                panel.fire('create-account');
            },

            'save': function save(item, value) {
                API.save(item, value);
            },

            'users': function users(item) {
                panel.fire('users', [item]);
            },

            'delete': function _delete(item) {
                API.checkUser({
                    'tid': meta.company.origin['tid'],
                    'item': item
                });
            },

            //禁用或启用账套。
            'set-status': function setStatus(item, index, enabled) {
                API.setStatus({
                    'enabled': enabled,
                    'company': meta.company,
                    'account': item,
                    'index': index
                });
            },

            'manual-bak': function manualBak(item) {
                API.manualBak({
                    'company': meta.company,
                    'account': item
                });
            },

            'auto-bak': function autoBak(item, index) {
                var enabled = item.origin['is_back_up'] == 1;

                API.setAutoBak({
                    'company': meta.company,
                    'account': item,
                    'enabled': !enabled, //这里取反。
                    'index': index
                });
            },

            'refresh': function refresh(item, index) {
                //恢复中的。
                if (item.status == 7 || item.status == 8) {
                    API.refresh(meta, item.origin['account_id']);
                } else {
                    //其它的
                    API.getList(meta);
                }
            },

            'apps': function apps(item) {
                panel.fire('apps', [item]);
            }

        });

        API.on('get', {
            'list': function list(_list) {
                List.render(_list, meta.product.status);
            }
        });

        API.on('set', {
            'status': function status(opt) {
                List.setStatus(opt.index, opt.enabled);
            },

            'manual-bak': function manualBak() {
                var msg = '操作完成。 <br /> ' + '是否进入账套备份列表查看账套备份状态';

                KISP.confirm(msg, function () {
                    panel.fire('to-baks');
                });
            },

            'auto-bak': function autoBak(opt) {
                List.setAutoBakStatus(opt.index, opt.enabled);
            }
        });

        API.on({
            'check-user': function checkUser(opt) {
                panel.fire('check-user', [opt.item]);
            },
            'check-recover': function checkRecover() {
                panel.fire('check-recover');
            },

            'save': function save(opt) {
                API.getList(meta);
            },

            'has-refresh': function hasRefresh() {
                API.getList(meta);
            }
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
        'checkRecover': API.checkRecover
    };
});