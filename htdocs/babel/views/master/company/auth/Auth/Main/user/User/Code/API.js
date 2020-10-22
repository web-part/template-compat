/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 55B9AF57C67BD7EB1B6F5296C2F93E3B
*
* source file: htdocs/views/master/company/auth/Auth/Main/user/User/Code/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Auth/Main/User/Code/API', function (require, module, exports) {
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
        'Account exist': '该账号已存在。',
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
                'type': 5 //验证码类型（type等于1为手机或邮箱注册验证码，2为手机或邮箱找回密码验证码，3为绑定手机验证码）type=5:企业认证联系人修改手机
            });
        }

    };
});