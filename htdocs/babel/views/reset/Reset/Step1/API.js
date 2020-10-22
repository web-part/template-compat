/*
* babel time: 2020-10-19 16:42:32
*
* source md5: AEB9BC0B53F69EBDFA9C86E9E871C7D0
*
* source file: htdocs/views/reset/Reset/Step1/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Reset/Step1/API', function (require, module, exports) {
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

    var msg$text = {
        'Account not exist': '该账号不存在。',
        'Send sms vcode limit per day': '已超过每天限制的条数。',
        'Vcode fail': '验证码错误。'
    };

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 发送手机短信验证码。
        */
        send: function send(phone) {
            var api = new API('web/enterprise/send_yun_msg', {
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
                    msg = msg$text[msg] || msg;
                    KISP.alert('短信验证码发送失败: <span style="color: red;">{0}</span>', msg);
                },

                'error': function error() {
                    KISP.alert('短信验证码发送错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'mobile': phone,
                'type': 2 //验证码类型（type等于1为手机或邮箱注册验证码，2为手机或邮箱找回密码验证码，3为绑定手机验证码）
            });
        }

    };
});