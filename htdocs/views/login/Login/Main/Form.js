

KISP.panel('/Login/Main/Form', function (require, module, panel) {
    var KISP = require('KISP');
    var Code = module.require('Code');
    var Role = module.require('Role');
    var Phone = module.require('Phone');
    var Password = module.require('Password');
    var CapsLock = module.require('CapsLock');
    var Footer = module.require('Footer');

    


    panel.on('init', function () {

        Phone.on({
            'blur': function (value) {
                Code.render(value);
            },
        });


        Footer.on({
            'login': function () {
                var phone = Phone.get();
                var password = Password.get();

                var invalid = [phone, password].some(function (item) {
                    if (typeof item == 'function') {
                        item();
                        return true;
                    }
                });

                if (invalid) {
                    return;
                }

                var role = Role.get();
                var code = Code.get();

                panel.fire('submit', [{
                    'username': phone,
                    'password': password,
                    'code': code,
                    'role': role.value,
                }]);

            },

            'reset': function () {
                panel.fire('reset');
            },

            'sign-up': function () {
                panel.fire('sign-up');
            },
        });

      
  

       
    });




    /**
    * 渲染。
    * 参数：
    *   //必选。
    *   form = {
    *       phone: '',
    *       password: '',
    *   },
    *
    *   //可选，第三方平台带进来的数据。
    *   third: {},      
    */
    panel.on('render', function (form, third) {
        var phone = form.phone;
        var readonly = false;

        //如果第三方包里有手机号，则用它的，并且不允许手机号输入框修改。
        if (third && third.phone) {
            phone = third.phone;
            readonly = true;
        }

        Phone.render(phone, readonly);
        Password.render(form.password);
        CapsLock.render();

        //如果为第三方的，则强行选中管理员，并隐藏。
        if (third) {
            Role.render(1);
            Role.hide();
        }
        else {
            Role.render();  //会自动显示。
        }


        Footer.render(third);

    });




    return {
        resetCode: function () {
            var phone = Phone.get();

            if (typeof phone == 'string') {
                Code.render(phone);
            }
        },

        getRole: function () {
            var role = Role.get();
            return role;
        },
    };




});