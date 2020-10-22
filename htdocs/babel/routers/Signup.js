/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 88E98377CF4E471336C06D3618B63EFF
*
* source file: htdocs/routers/Signup.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Signup', function (require, module) {

    return {
        'render': function render() {},

        /**
        * 转到登录视图。
        *   data = {
        *       phone: '',      //可选，手机号。
        *       password: '',   //可选，密码。
        *       third: {},      //可选，第三方包。
        *   };
        */
        'login': function login(data) {
            var Navigator = module.require('Navigator');
            Navigator.to('Login', [data]);
        },

        /**
        * (第三方平台)用户注册成功。
        * 根据后台的指令重新跳转。
        * 参数：
        *   third = {       //必选，第三方包，从后台取得。
        *       type: 2,    //必选，跳转类型。 `2` 会跳到企业注册。
        *       ...
        *   };
        */
        'third': function third(_third) {
            var Navigator = module.require('Navigator');
            Navigator.jump(_third);
        }
    };
});