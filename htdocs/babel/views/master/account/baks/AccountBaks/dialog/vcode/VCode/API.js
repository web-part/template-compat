/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 2C78859CC960C002FFC92621DF65F7AC
*
* source file: htdocs/views/master/account/baks/AccountBaks/dialog/vcode/VCode/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountBaks/VCode/API', function (require, module, exports) {
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
        *   company: {},    //企业信息。
        */
        get: function get(company) {
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

                    var phone = data.mobile;

                    emitter.fire('success', 'get', [phone]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取手机号失败: {0}', msg, function () {
                        emitter.fire('fail', 'get');
                    });
                },

                'error': function error() {
                    KISP.alert('获取手机号错误: 网络繁忙，请稍候再试', function () {
                        emitter.fire('fail', 'get');
                    });
                }
            });

            api.post({
                'tid': company.origin['tid'] //用户企业ID
            });
        },

        /**
        * 发送手机短信验证码。
        *   opt = {
        *       action: '',     //必选，`download` 或 `delete`。
        *       company: {},    //必选，企业信息。
        *       account: {},    //可选，账套信息。 针对单个操作，需要提供。 批量操作的，则无需提供。
        *   };
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

            var action$type = {
                'download': 2,
                'delete': 3
            };

            var type = action$type[opt.action];
            var company = opt.company.origin;
            var account = opt.account;

            var params = {
                'type': type,
                'tid': company['tid'] //用户企业ID
            };

            //针对单个的，则需要提供账套名给后台。
            if (account && !Array.isArray(account)) {
                params['account_name'] = account.origin['account_name'] || //公有云的。
                account.origin['back_name']; //私有云的。
            }

            api.post(params);
        }

    };
});