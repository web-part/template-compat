/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 6B6834AE8B1790DA40B0B8D51818DBD2
*
* source file: htdocs/views/master/application/user/ApplicationUsers/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/ApplicationUsers/Main', function (require, module, panel) {

    var API = module.require('API');
    var List = module.require('List');

    var User = require('User');

    var meta = {
        company: null,
        product: null,
        application: null
    };
    var listData = [];

    panel.on('init', function () {

        function Search(keyword) {
            var searchList = [];
            listData.map(function (item, index) {
                if (item.phone.indexOf(keyword) != -1 || item.name.indexOf(keyword) != -1) {
                    searchList.push(item);
                }
            });
            List.render(searchList);
        }
        panel.$on('click', {
            '[data-cmd="selector"]': function dataCmdSelector() {
                var cmd = this.getAttribute('data-cmd');
                panel.$.find('[data-type="account-select"]').removeClass('on');
                panel.fire(cmd);
            },
            '[data-type="search"]': function dataTypeSearch() {
                var keyword = panel.$.find('[data-type="txt"]').val();
                Search(keyword);
            }
        });
        panel.$.find('[data-type="txt"]').on({
            'keypress': function keypress() {
                if (event.keyCode === 13) {
                    var keyword = panel.$.find('[data-type="txt"]').val();
                    Search(keyword);
                }
            }
        });

        List.on('set', {
            'save': function save(item, value) {
                //保存修改名字
                API.setInfo({
                    'tid': meta.company.origin['tid'], //企业ID
                    'prod_id': meta.product.origin['prod_id'], //产品ID
                    'slv_prod_id': meta.application.origin['slv_prod_id'], //应用ID
                    'user_id': item.origin.user_id,
                    'user_name': value
                });
            },
            'status': function status(enabled, item, index) {
                API.setInfo({
                    'tid': meta.company.origin['tid'], //企业ID
                    'prod_id': meta.product.origin['prod_id'], //账套ID
                    'slv_prod_id': meta.application.origin['slv_prod_id'], //产品ID
                    'user_id': item.origin.user_id,
                    'status': enabled ? 1 : 0 //用户状态，0为禁用，1为启用，2为删除
                });
            },
            'delete': function _delete(enabled, item, index) {
                if (!enabled) {
                    return;
                }
                API.setInfo({
                    'tid': meta.company.origin['tid'], //企业ID
                    'prod_id': meta.product.origin['prod_id'], //产品ID
                    'slv_prod_id': meta.application.origin['slv_prod_id'], //应用ID
                    'user_id': item.origin.user_id,
                    'status': 2
                });
            }

        });

        API.on('success', {
            'get': function get(list) {
                listData = list;
                List.render(list);
                panel.$.addClass('rendered');
                panel.fire('render', [list]);
                if (!list.length) {
                    var userInfo = User.get();
                    if (userInfo) {
                        panel.$.find('[data-type="account-select"]').addClass('on');
                        return;
                    }
                    panel.$.find('[data-type="account-select"]').removeClass('on');
                }
            },
            'set': function set(data) {
                API.get(meta); //设置后重新刷新列表
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
        meta = data;
        panel.$.removeClass('rendered');

        API.get(data);
    });
});