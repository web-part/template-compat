/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 05959E65989C9D64285C11112590691D
*
* source file: htdocs/views/master/company/auth/Auth/Main/user/User/Code.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 手机验证码。
*/
KISP.panel('/Auth/Main/User/Code', function (require, module, panel) {

    var API = module.require('API');
    var Code = module.require('Code');

    var meta = {
        phone: '' //关联的手机号。
    };

    panel.on('init', function () {

        API.on('success', {
            //验证码发送成功。
            'send': function send() {
                Code.countdown(60);
            }
        });

        Code.on({
            'send': function send() {
                API.send(meta.phone);
            }
        });
    });

    panel.on('render', function () {
        meta = {
            phone: '' //关联的手机号。
        };

        Code.render();
    });

    return {
        enable: function enable(valid, phone) {

            meta.phone = valid ? phone : '';

            Code.enable(valid);
        },

        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function countdown(count) {
            Code.countdown(count);
        },

        get: Code.get
    };
});