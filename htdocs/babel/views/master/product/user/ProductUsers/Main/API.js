/*
* babel time: 2020-10-19 16:41:38
*
* source md5: DDB72377150F2BE5C9ED22EC6E452190
*
* source file: htdocs/views/master/product/user/ProductUsers/Main/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/ProductUsers/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取某个产品下的在线用户列表。
        *   opt = {
        *       product: {},    //产品信息。
        *   };
        */
        get: function get(opt) {

            var api = new API('web/user/get_online_user_list', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show('获取中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    var list = data || [];

                    var type$product = {
                        1: '金蝶KIS云',
                        2: 'KIS云进销存'
                    };

                    list = list.map(function (item, index) {
                        return {
                            'phone': item['FMobile'],
                            'name': item['FRealName'],
                            'account': item['FAcctName'],
                            'product': type$product[item['FType']] || '(未知)', //用户登录的产品类型，1为KIS云，2为KIS云进销存
                            'origin': item
                        };
                    });

                    emitter.fire('success', 'get', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取在线用户列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取在线用户列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'prod_id': opt.product.origin['prod_id'] //产品 id。
            });
        },

        /**
        * 删除用户。
        * 即踢出指定的在线用户。
        * 参数：
        *   item = { //列表中的指定的项。
        *       
        *   };
        */
        delete: function _delete(item) {

            var api = new API('web/user/get_off_user', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('注销中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    toast.show('注销用户成功', function () {
                        emitter.fire('success', 'delete');
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('注销用户失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('注销用户错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'account_id': item.origin['FAcctID'], //账套 id。
                'prod_user_id': item.origin['FProdUserID'] //在线用户 id。
            });
        }

    };
});