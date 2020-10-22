/*
* babel time: 2020-10-19 16:41:37
*
* source md5: AB157362447D0AD7068B055894984B7D
*
* source file: htdocs/views/master/application/list/Application/dialog/manage/Manage/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Application/Manage/API', function (require, module, exports) {
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
        * 获取应用使用人数数据。
        */
        getNum: function getNum(opt) {

            var api = new API('web/apply/qingUserUsed', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    emitter.fire('success', 'get-num', [{
                        'total': data.count,
                        'used': data.used_count
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取移动应用用户使用情况失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取移动应用用户使用情况错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(opt);
        },

        /**
        * 获取移动应用用户列表。
        */
        get: function get(opt) {

            var api = new API('web/apply/qingUserList', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    var list = data.list.map(function (item, index) {
                        return {
                            'name': item['user_name'],
                            'acctname': item['acct_name'],
                            'mobile': item['mobile'],
                            'time': item['last_used_time'],
                            'origin': item
                        };
                    });
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取移动应用用户列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取移动应用用户列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(opt);
        },

        /**
        * 解绑移动应用。
        */
        post: function post(opt) {

            var api = new API('web/apply/unbindQingUser', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    toast.show('解绑用户成功', function () {
                        emitter.fire('success', 'post');
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('解绑用户失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('解绑用户错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.meta.product.origin.tid, //企业id
                'prod_id': opt.meta.product.origin.prod_id, //产品实例id
                'slv_prod_id': opt.meta.application.origin.slv_prod_id,
                'user_list': opt.user
            });
        }

    };
});