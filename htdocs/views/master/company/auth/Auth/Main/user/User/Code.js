
/*
* 手机验证码。
*/
KISP.panel('/Auth/Main/User/Code', function (require, module, panel) {
    
    var API = module.require('API');
    var Code = module.require('Code');



    var meta = {
        phone: '',          //关联的手机号。
    };



    panel.on('init', function () {

        API.on('success', {
            //验证码发送成功。
            'send': function () {
                Code.countdown(60);
            },
        });

        Code.on({
            'send': function () {
                API.send(meta.phone);
            },
        });
    });




    panel.on('render', function () {
        meta = {
            phone: '',          //关联的手机号。
        };

        Code.render();

    });





    return {
        enable: function (valid, phone) {

            meta.phone = valid ? phone : '';

            Code.enable(valid);
        },

        /**
        * 倒计时。
        * 在发送短信验证码成功后，禁用发送按钮。 
        * 同时开始倒计时，归零后启用发送按钮。
        */
        countdown: function (count) {
            Code.countdown(count);
        },

        get: Code.get,
    };

});





