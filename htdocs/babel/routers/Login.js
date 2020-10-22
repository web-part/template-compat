/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 46E9057D6F114B2E1B611A5C98E7942C
*
* source file: htdocs/routers/Login.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Login', function (require, module) {

    return {
        /**
        * 
        */
        'render': function render() {
            var Navigator = module.require('Navigator');
            Navigator.to('Login');
        },

        /**
        * 登录成功。
        */
        'success': function success(user) {
            var Master = module.require('Master');
            Master.render(user);
        },

        /**
        * 转到重置密码视图。
        *   third: {},  //可选，第三方包。
        */
        'reset': function reset(third) {
            var Login = module.require('Login');
            var Navigator = module.require('Navigator');

            Login.hide(); //这里待解决，Navigator有问题，做不到隐藏上一个视图。
            Navigator.to('Reset', [third]);
        },

        /**
        * 转到用户注册视图。
        *   third: {},  //可选，第三方包。
        */
        'sign-up': function signUp(third) {
            var Login = module.require('Login');
            var Navigator = module.require('Navigator');

            Login.hide(); //这里待解决，Navigator有问题，做不到隐藏上一个视图。
            Navigator.to('Signup', [third]);
        },

        /**
        * 退出登录成功。
        */
        'logout': function logout() {
            var Navigator = module.require('Navigator');
            var Master = module.require('Master');

            Master.hide();
            Navigator.enable(true);
            Navigator.to('Login');

            ////刷新一下，解决切换账号的缓存等问题。
            //location.reload();
        },

        /**
        * 第三方登录成功，重新跳转。
        */
        'third': function third(_third) {
            //登录成功后，后台会据该用户是否已有企业进行跳转（第三方的模式下）：
            //没有企业：跳到注册企业页面。
            //已有企业：跳到绑定企业页面。
            var Navigator = module.require('Navigator');
            Navigator.jump(_third);
        }

        // 'updates': function () {   //目前未登录不允许查看日志
        //     var Updates = module.require('Updates');
        //     Updates.render();
        // }
    };
});