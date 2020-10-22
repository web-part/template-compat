/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 486450A8E47C511CB1865A875ECB64B3
*
* source file: htdocs/views/master/company/auth/Auth/Main/user/User.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 联系人信息。
*/
KISP.panel('/Auth/Main/User', function (require, module, panel) {

    var Name = module.require('Name'); //联系人姓名。
    var Phone = module.require('Phone'); //联系人手机。
    var Code = module.require('Code'); //验证码。
    var Email = module.require('Email'); //联系人邮箱。


    panel.on('init', function () {

        Phone.on({
            'change': function change(valid, value) {
                Code.enable(valid, value);
            }
        });
    });

    panel.on('render', function () {
        Name.render();
        Phone.render();
        Code.render();
        Email.render();
    });

    return {
        get: function get() {
            var name = Name.get();
            var phone = Phone.get();
            var code = Code.get();
            var email = Email.get();

            return [{ key: 'name', value: name }, { key: 'phone', value: phone }, { key: 'code', value: code }, { key: 'email', value: email }];
        }

    };
});