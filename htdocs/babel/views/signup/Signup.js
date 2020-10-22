/*
* babel time: 2020-10-19 16:42:32
*
* source md5: B23B3A66ABE130BA7C7D285FC0545B41
*
* source file: htdocs/views/signup/Signup.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 注册云之家账号。
*/
KISP.view('/Signup', function (require, module, view) {
    var Form = module.require('Form');

    var meta = {
        third: null //第三方平台进来时带入的数据包。
    };

    view.on('init', function () {

        //注册成功。
        Form.on('success', {
            //自身的注册成功。
            'self': function self(form) {
                view.fire('login', [{
                    'phone': form.phone,
                    'password': form.password
                }]);
            },

            //第三方平台的注册成功。
            'third': function third(_third) {
                view.fire('third', [_third]); //新的第三方包。
            }
        });

        Form.on({
            //该账号已注册（已存在）
            'exist': function exist(form, third) {
                if (!third) {
                    return;
                }

                //跳到登录页。
                view.fire('login', [{
                    'phone': form.phone,
                    'third': third //此 third 即为进来时的那个。
                }]);
            }
        });

        //底部的 `立即登录` 小按钮。
        view.$on('click', {
            '[data-cmd="login"]': function dataCmdLogin() {
                view.fire('login', [{
                    'third': meta.third //使用进来时的第三方包。
                }]);
            }

        });
    });

    /**
    * 渲染。
    * 参数：
    *   //可选，由第三方平台进来时的数据。
    *   third = {
    *       type: 1,            //必选，跳转类型，用于后台验证。
    *       user_open_id: '',   //必选，
    *       rand_state: '',     //必选，
    *   };
    */
    view.on('render', function (third) {
        meta.third = third;

        Form.render(third);
    });
});