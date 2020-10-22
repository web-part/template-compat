
define('/Reset/Step2/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });

    var msg$text = {
        'Account not exist': '该账号不存在。',
        'Send sms vcode limit per day': '已超过每天限制的条数。',
        'Vcode fail': '验证码错误。',
    };


    return {
        'on': emitter.on.bind(emitter),

        

        /**
        * 提交重置。
        */
        post: function (form) {
            var api = new API('web/enterprise/forget_psw', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('重置中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    emitter.fire('success', []);

                },

                'fail': function (code, msg, json) {
                    msg = msg$text[msg] || msg;
                    KISP.alert('重置密码失败: <span style="color: red;">{0}</span>', msg);

                },

                'error': function () {
                    KISP.alert('重置密码错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'mobile': form.phone,
                'code': form.code,
                'password': form.password2,
            });
        },






     
    };


});