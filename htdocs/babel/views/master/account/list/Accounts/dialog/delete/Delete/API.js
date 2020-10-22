/*
* babel time: 2020-10-19 16:41:37
*
* source md5: D43A1326DFB2DCF61DF0D20819FCF0CD
*
* source file: htdocs/views/master/account/list/Accounts/dialog/delete/Delete/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Accounts/Delete/API', function (require, module, exports) {
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
        * 获取手机号。
        */
        get: function get(opt) {
            var api = new API('web/user/get_enter_creator', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('号码获取中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    emitter.fire('success', 'get', [{
                        'phone': data.mobile
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取手机号失败: {0}', msg);
                    emitter.fire('fail', 'get');
                },

                'error': function error() {
                    KISP.alert('获取手机号错误: 网络繁忙，请稍候再试');
                    emitter.fire('fail', 'get');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'] //用户企业ID
            });
        },

        /**
        * 发送手机短信验证码。
        */
        send: function send(opt) {
            var api = new API('web/product/send_del_account_code', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('发送中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('发送成功', function () {
                        emitter.fire('success', 'send', [data]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('短信验证码发送失败: {0}', msg);
                    emitter.fire('fail', 'send', []);
                },

                'error': function error() {
                    KISP.alert('短信验证码发送错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //用户企业ID
                'account_name': opt.account.origin['account_name'], //账套名称
                'type': opt.type
            });
        },

        /**
        * 删除账套。
        */
        delete: function _delete(opt) {
            var api = new API('web/product/del_account', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('删除中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('删除成功');
                    opt.fn && opt.fn({
                        'company': opt.company,
                        'product': opt.product
                    });
                    emitter.fire('success', 'delete', [data]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('删除账套失败: {0}', msg);
                    emitter.fire('fail', 'delete', []);
                },

                'error': function error() {
                    KISP.alert('删除账套错误: 网络繁忙，请稍候再试');
                    emitter.fire('fail', 'delete', []);
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //用户企业ID
                'account_id': opt.account.origin['account_id'], //账套ID
                'code': opt.form ? opt.form['code'] : '' //短信验证码。
            });
        }

    };
});