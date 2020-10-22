/*
* babel time: 2020-10-19 16:42:32
*
* source md5: C4DB6030E7DDA3035A7C4E88E7DA3F5D
*
* source file: htdocs/views/reset/Reset/Step1.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 重置密码。
*/
KISP.panel('/Reset/Step1', function (require, module, panel) {

    var API = module.require('API');
    var Phone = module.require('Phone');
    var Code = module.require('Code');
    var Next = module.require('Next');

    var form = {
        phone: '',
        code: ''
    };

    panel.on('init', function () {

        Phone.on({
            'change': function change(valid, value) {
                form.phone = valid ? value : '';

                Code.enable(valid);
                Next.render(form);
            }
        });

        Code.on({
            'send': function send() {
                API.send(form.phone);
            },
            'change': function change(valid, value) {
                form.code = valid ? value : '';
                Next.render(form);
            }
        });

        API.on('success', {
            //验证码发送成功。
            'send': function send() {
                Code.countdown(60);
            }
        });

        Next.on({
            'submit': function submit() {
                panel.$.removeClass('on');
                panel.fire('next', [form]);
            }
        });
    });

    panel.on('render', function (third) {

        form = {
            phone: '',
            code: ''
        };

        panel.$.addClass('on');

        Phone.render(third);
        Code.render();
        Next.render();

        panel.fire('render');
    });

    return {
        removeClass: function removeClass() {
            panel.$.removeClass('on');
        }
    };
});