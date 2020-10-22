
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
        code: '',
    };




    panel.on('init', function () {
        
        Phone.on({
            'change': function (valid, value) {
                form.phone = valid ? value : '';

                Code.enable(valid);
                Next.render(form);
            },
        });

        Code.on({
            'send': function () {
                API.send(form.phone);
            },
            'change': function (valid, value) {
                form.code = valid ? value : '';
                Next.render(form);
            },
        });

        API.on('success', {
            //验证码发送成功。
            'send': function () {
                Code.countdown(60);
            },
        });

        Next.on({
            'submit': function () {
                panel.$.removeClass('on');
                panel.fire('next', [form]);
            },
        });

    });




    panel.on('render', function (third) {
        
        form = {
            phone: '',
            code: '',
        };


        panel.$.addClass('on');

        Phone.render(third);
        Code.render();
        Next.render();

        panel.fire('render');
    });




    return {
        removeClass: function () {
            panel.$.removeClass('on');
        },
    };



});