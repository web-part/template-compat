
/*
* 联系人信息。
*/
KISP.panel('/Auth/Main/User', function (require, module, panel) {
    

    var Name = module.require('Name');          //联系人姓名。
    var Phone = module.require('Phone');        //联系人手机。
    var Code = module.require('Code');          //验证码。
    var Email = module.require('Email');        //联系人邮箱。
 


    panel.on('init', function () {

        Phone.on({
            'change': function (valid, value) {
                Code.enable(valid, value);
            },
        });


    });



    panel.on('render', function () {
        Name.render();
        Phone.render();
        Code.render();
        Email.render();

    });

    return {
        get: function () {
            var name = Name.get();
            var phone = Phone.get();
            var code = Code.get();
            var email = Email.get();

            return [
                { key: 'name', value: name, },
                { key: 'phone', value: phone, },
                { key: 'code', value: code, },
                { key: 'email', value: email, },
            ];
        },

    };


});





