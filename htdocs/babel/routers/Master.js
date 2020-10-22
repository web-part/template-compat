/*
* babel time: 2020-10-19 16:42:32
*
* source md5: C911505F32754CFDDC31E2A1A654FE16
*
* source file: htdocs/routers/Master.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Master', function (require, module) {

    return {
        //透传给 Master 内部的视图管理器。
        'require': function require(name) {
            return module.require(name);
        },

        'render': function render() {
            var Navigator = module.require('Navigator');
            var Header = module.require('Header');
            var Message = module.require('Message');

            Navigator.enable(false); //禁用外层的 hash 管理器。
            Header.setUserLogined(true); //已登录。 用于显示相关的图标等，如 `通知`。
            Message.render(); //登录成功后，获取最新系统消息和未读消息条数。
        },

        'logout': function logout() {
            var Login = module.require('Login');
            var Header = module.require('Header');
            var Message = module.require('Message');

            Login.logout();
            Header.setUserLogined(false); //已退出登录，用于隐藏相关的图标等，如 `通知`。
            Message.hide(); //隐藏可能已弹出的消息框。
        },

        /**
        * 切换用户角色成功。
        */
        'switch': function _switch(user) {
            var Login = module.require('Login');
            Login.done(user);

            //刷新一下，解决切换账号的缓存等问题。
            //location.reload();
        }
    };
});