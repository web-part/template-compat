/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 1CC21DB5931926FA4C52389AEBD56341
*
* source file: htdocs/views/master/account/user/AccountUsers/Main/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountUsers/Main/API', function (require, module, exports) {
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
        * 获取账套用户列表。
        */
        get: function get(opt) {

            var api = new API('web/user/get_user_list', {
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
                    var list = data || [];

                    list = list.map(function (item) {
                        return {
                            'phone': item['moblie'],
                            'name': item['user_account_name'],
                            'status': item['status'], //账套状态，0为禁用，1为启用，2为删除',
                            'role': item['role'], //用户角色，0、未定义，1、管理员，2普通用户',
                            'origin': item
                        };
                    });

                    emitter.fire('success', 'get', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取产品列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取产品列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //企业 id。
                'prod_id': opt.product.origin['prod_id'], //账套 id。
                'account_id': opt.account.origin['account_id'] //产品 id。
            });
        },

        /**
        * 设置用户状态。
        */
        setStatus: function setStatus(opt) {

            var api = new API('web/user/change_user_status', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    emitter.fire('success', 'set', 'status', [opt]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('设置用户状态失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('设置用户状态错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //企业ID
                'prod_id': opt.product.origin['prod_id'], //账套ID
                'account_id': opt.account.origin['account_id'], //产品ID
                'account_uid': opt.item.origin['account_uid'], //需要被禁用的账套用户UID
                'status': opt.enabled ? 1 : 0 //用户状态，0为禁用，1为启用，2为删除

            });
        },
        deleteUser: function deleteUser(opt) {

            var api = new API('web/user/del_user', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    emitter.fire('success', 'delete', [json]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('删除用户失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('删除用户错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(opt);
        },

        /**
        * 设置用户角色。
        */
        setRole: function setRole(opt) {
            var api = new API('web/user/set_user_admin', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('设置成功', function () {
                        emitter.fire('success', 'set', 'role', [opt]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('设置用户角色失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('设置用户角色错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //企业ID
                'prod_id': opt.product.origin['prod_id'], //账套ID
                'account_id': opt.account.origin['account_id'], //产品ID
                'account_uid': opt.item.origin['account_uid'], //需要被禁用的账套用户UID
                'role': opt.enabled ? 1 : 2 //用户角色，'0、未定义，1、管理员，2普通用户',
            });
        },

        /**
        * 修改账套名字。
        */
        save: function save(opt) {
            var api = new API('web/user/change_account_user_name', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('保存中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('保存成功', function () {
                        emitter.fire('success', 'save');
                    });
                },

                'fail': function fail(code, msg, json) {

                    KISP.alert('保存账套用户名字失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('保存账套用户名字错误: 网络繁忙，请稍候再试');
                }
            });
            api.post(opt);
        }

    };
});