/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F39881E238ECA3D398B3DA2963BFA410
*
* source file: htdocs/views/signup/Signup/Form.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Signup/Form', function (require, module, panel) {
    var KISP = require('KISP');

    var API = module.require('API');
    var Phone = module.require('Phone');
    var Code = module.require('Code');
    var Password = module.require('Password');
    var Name = module.require('Name');
    var Agree = module.require('Agree');
    var Submit = module.require('Submit');

    var meta = {
        third: null, //如果此字段不为空，则说明是第三方平台跳进来的，如腾讯云注册云平台。

        form: {
            phone: '',
            code: '',
            password: '',
            name: '',
            agreed: true
        }
    };

    panel.on('init', function () {

        Phone.on({
            'change': function change(valid, value) {
                Code.enable(valid);
                meta.form.phone = valid ? value : '';
                Submit.render(meta.form);
            }
        });

        Code.on({
            'send': function send() {
                API.send(meta.form.phone);
            },
            'change': function change(valid, value) {
                meta.form.code = valid ? value : '';
                Submit.render(meta.form);
            }
        });

        Name.on({
            'change': function change(valid, value) {
                meta.form.name = valid ? value : '';
                Submit.render(meta.form);
            }
        });

        Password.on({
            'change': function change(valid, value) {
                meta.form.password = valid ? value : '';
                Submit.render(meta.form);
            }
        });

        Agree.on({
            'change': function change(value) {
                meta.form.agreed = value;
                Submit.render(meta.form);
            }
        });

        API.on('success', {
            //验证码发送成功。
            'send': function send() {
                Code.countdown(60);
            },

            //注册成功。
            'post': function post(third) {
                if (meta.third) {
                    panel.fire('success', 'third', [third]); //此时参数里的 third 为后台返回的新数据包，用于重新跳转。
                } else {
                    panel.fire('success', 'self', [meta.form]);
                }
            }
        });

        API.on('post', {
            //注册失败，账号已存在。
            'exist': function exist() {
                panel.fire('exist', [meta.form, meta.third]);
            }
        });

        Submit.on({
            //提交注册。
            'submit': function submit() {
                API.post(meta.form, meta.third);
            }
        });
    });

    panel.on('render', function (third) {
        meta.third = third; //如果此字段不为空，则说明是腾第三方平台跳进来的。

        meta.form = {
            phone: '',
            code: '',
            password: '',
            name: '',
            agreed: true
        };

        Phone.render();
        Code.render();
        Password.render();
        Name.render();
        Agree.render(meta.form);
        Submit.render();
    });
});