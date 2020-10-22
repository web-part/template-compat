/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 9AE70C5C95B1C65562F84014A5EB664C
*
* source file: htdocs/views/master/account/user/AccountUsers/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountUsers/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Search = module.require('Search');

    var User = require('User');

    var meta = {
        company: null,
        product: null,
        account: null,
        list: []
    };

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="selector"]': function dataCmdSelector() {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="account-select"]').removeClass('on');
                panel.fire(cmd);
            }
        });

        Search.on({
            'submit': function submit(list, keyword) {
                List.render(list);
            }
        });

        List.on('set', {
            'status': function status(enabled, item, index) {
                API.setStatus({
                    'company': meta.company,
                    'product': meta.product,
                    'account': meta.account,
                    'enabled': enabled,
                    'item': item,
                    'index': index
                });
            },
            'delete': function _delete(enabled, item, index) {
                if (!enabled) {
                    return;
                }

                API.deleteUser({
                    'account_user_id': item.origin.account_uid,
                    'account_id': meta.account.origin['account_id']
                });
            },

            'role': function role(enabled, item, index) {
                API.setRole({
                    'company': meta.company,
                    'product': meta.product,
                    'account': meta.account,
                    'enabled': enabled,
                    'item': item,
                    'index': index
                });
            }

        });

        List.on({
            'save': function save(item, value) {
                API.save({
                    'tid': meta.company.origin.tid,
                    'account_id': meta.account.origin['account_id'],
                    'prod_id': meta.product.origin['prod_id'],
                    'account_uid': item.origin['account_uid'],
                    'user_account_name': value
                });
            }
        });

        API.on('success', {
            'get': function get(list) {
                Search.render(list);
                List.render(list);

                panel.$.addClass('rendered');
                panel.fire('render', [list]);

                if (!list.length) {
                    var userInfo = User.get();
                    panel.$.find('[data-type="account-select"]').toggleClass('on', !!userInfo);
                }
            },

            'set': {
                'status': function status(opt) {
                    API.get(meta);
                },

                'role': function role(opt) {
                    API.get(meta);
                }
            },

            'delete': function _delete(data) {
                if (data.msg == 'success') {
                    KISP.alert('删除用户成功', function () {
                        API.get(meta);
                    });
                }
            },

            'save': function save() {
                API.get(meta);
            }

        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *       account: {},    //账套信息。
    *   };
    */
    panel.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.account = data.account;
        meta.list = [];

        panel.$.removeClass('rendered');
        API.get(data);
    });
});