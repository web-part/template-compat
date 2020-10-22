/**
* 
*/
KISP.route('Master', function (require, module) {


    return {
        //透传给 Master 内部的视图管理器。
        'require': function (name) {
            return module.require(name);
        },

        'render': function () {
            var Navigator = module.require('Navigator');
            var Header = module.require('Header');
            var Message = module.require('Message');


            Navigator.enable(false);        //禁用外层的 hash 管理器。
            Header.setUserLogined(true);    //已登录。 用于显示相关的图标等，如 `通知`。
            Message.render();               //登录成功后，获取最新系统消息和未读消息条数。
        },

        'logout': function () {
            var Login = module.require('Login');
            var Header = module.require('Header');
            var Message = module.require('Message');

            Login.logout();
            Header.setUserLogined(false);   //已退出登录，用于隐藏相关的图标等，如 `通知`。
            Message.hide();                 //隐藏可能已弹出的消息框。
        },

        /**
        * 切换用户角色成功。
        */
        'switch': function (user) { 
            var Login = module.require('Login');
            Login.done(user);

            //刷新一下，解决切换账号的缓存等问题。
            //location.reload();
        },
    };
});
