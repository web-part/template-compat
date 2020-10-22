﻿
define('/Signup/Form/API', function (require, module, exports) {
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
        'Account exist': '该账号已存在。',
        'Send sms vcode limit per day': '已超过每天限制的条数。',
        'Vcode fail': '验证码错误。',
    };


    return {
        'on': emitter.on.bind(emitter),

        

        /**
        * 发送手机短信验证码。
        */
        send: function (phone) {
            var api = new API('web/enterprise/send_yun_msg', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('发送中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('发送成功', function () {
                        emitter.fire('success', 'send', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    msg = msg$text[msg] || msg;
                    msg = `短信验证码发送失败: <span style="color: red;">${msg}</span>`;

                    KISP.alert(msg, function () {
                        //该账号已存在。
                        if (code == 1502) {
                            emitter.fire('post', 'exist');
                        }
                    });

                },

                'error': function () {
                    KISP.alert('短信验证码发送错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'mobile': phone,
                'type': 1, //验证码类型（type等于1为手机或邮箱注册验证码，2为手机或邮箱找回密码验证码，3为绑定手机验证码）
            });
        },


        /**
        * 提交注册。
        * 参数：
        *   //必选，表单数据。
        *   form: {
        *       
        *   },
        *
        *   //可选，第三方平台参数。
        *   third: {
        *       
        *   },
        */
        post: function (form, third) {
            var api = new API('web/enterprise/reg_yun', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('注册中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('注册成功', function () {
                        emitter.fire('success', 'post', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    msg = msg$text[msg] || msg;
                    msg = `注册云之家账号失败: <span style="color: red;">${msg}</span>`;

                    KISP.alert(msg, function () {
                        //该账号已存在。
                        if (code == 1502) {
                            emitter.fire('post', 'exist');
                        }
                    });
                },

                'error': function () {
                    KISP.alert('注册云之家账号错误: 网络繁忙，请稍候再试');
                },
            });


            var params = {
                'mobile': form.phone,
                'code': form.code,
                'password': form.password,
                'name': form.name,
            };

            //第三方平台的。
            if (third) {
                Object.assign(params, third);
            }

            api.post(params);


        },





     
    };


});