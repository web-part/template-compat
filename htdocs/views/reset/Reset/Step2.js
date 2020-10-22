
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
        password2: '',
    };




    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: '',
            width: 185,
        });

        Password1.on({
            'change': function (valid, value) {
                form.password1 = valid ? value : '';
                Next.render(form);
            },
        });

        Password2.on({
            'change': function (valid, value) {
                form.password2 = valid ? value : '';
                Next.render(form);

            },

            'blur': function (value) {
                if (form.password1 != value) {
                    toast.show('两次输入的密码不一致。');
                }
            },
        });

        Next.on({
            'submit': function () {
                API.post(form);
            },
        });

        API.on({
            'success': function () {
                panel.$.removeClass('on');
                panel.fire('next', [form]);
            },
        });
    });




    panel.on('render', function (data) {
        
        form = {
            'phone': data.phone,
            'code': data.code,
            'password1': '',
            'password2': '',
        };

        panel.$.addClass('on');


        Password1.render();
        Password2.render();
        Next.render();

        panel.fire('render');

    });

    return {
        removeClass: function () {
            panel.$.removeClass('on');
        },
    };


});