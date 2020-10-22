/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 86A8DDE68CFAFEAD095DC2C6A45786B4
*
* source file: htdocs/index.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 主控制器。
*/
KISP.launch(function (require, module, nav) {
    var API = require('API');
    var Loading = module.require('Loading');

    API.on({
        'session-timeout': function sessionTimeout() {
            var Login = module.require('Login');
            Login.logout();

            //这里要刷新一下。 
            //因为超时退出的，可能是由 Master 里的弹出对话框弹出对话框触发的。
            //刷新可以统一关闭对话框，从而避免在登录页显示了 Master 里的弹出对话框。
            location.reload();
        }
    });

    Loading.on({
        'hide': function hide() {
            var env = KISP.data('env');

            module.render('Header', env);
            module.render('Navigator');
        }
    });

    //启动。
    Loading.hide();
});