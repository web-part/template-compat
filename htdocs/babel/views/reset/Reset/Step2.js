/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F911F791C6A0D9BB7B30B429FB0BC85E
*
* source file: htdocs/views/reset/Reset/Step2.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 重置密码。
*/
KISP.panel('/Reset/Step2', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var Password1 = module.require('Password1');
    var Password2 = module.require('Password2');
    var Next = module.require('Next');

    var form = {
        phone: '',
        code: '',
        password1: '',
        password2: ''
    };

    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: '',
            width: 185
        });

        Password1.on({
            'change': function change(valid, value) {
                form.password1 = valid ? value : '';
                Next.render(form);
            }
        });

        Password2.on({
            'change': function change(valid, value) {
                form.password2 = valid ? value : '';
                Next.render(form);
            },

            'blur': function blur(value) {
                if (form.password1 != value) {
                    toast.show('两次输入的密码不一致。');
                }
            }
        });

        Next.on({
            'submit': function submit() {
                API.post(form);
            }
        });

        API.on({
            'success': function success() {
                panel.$.removeClass('on');
                panel.fire('next', [form]);
            }
        });
    });

    panel.on('render', function (data) {

        form = {
            'phone': data.phone,
            'code': data.code,
            'password1': '',
            'password2': ''
        };

        panel.$.addClass('on');

        Password1.render();
        Password2.render();
        Next.render();

        panel.fire('render');
    });

    return {
        removeClass: function removeClass() {
            panel.$.removeClass('on');
        }
    };
});