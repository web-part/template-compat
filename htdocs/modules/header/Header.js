
/*
* 
*/
KISP.panel('/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var Logo = module.require('Logo');
    var Tips = module.require('Tips');
    var Nav = module.require('Nav');
    var API = module.require('API');


    var meta = {
        env: null,   //外面传进来的数据。
    };



    panel.on('init', function () {
        Nav.on('cmd', function (cmd) {

            if (cmd == 'my-order') {
                API.getUrl();
            }
            else {
                panel.fire(cmd);
            }
        });


        Logo.on('cmd', function (cmd) {
            panel.fire(cmd);
        });


        API.on('success', {
            //获取跳转地址成功。
            'url': function (url, defaults) {
                if (defaults.test == 1) {
                    window.open(url);
                }
                else {
                    console.log(url);
                }
            },
        });

    });


    /**
    * 渲染。
    *   env = {
    *       name: '',   //环境的名称。
    *       data: '',   //环境的数据。
    *   };
    */
    panel.on('render', function (env) {
        meta.env = env;

        Logo.render();
        Tips.render(env);
        Nav.render(0, env);

    });


    return {
        /**
        * 设置未读消息条数。
        */
        setMessageCount: function (count) {
            Nav.render(count, meta.env);
        },

        /**
        * 设置用户是否已处于登录状态。
        * 用于显示或隐藏头部的相关图标，如 `通知` 需要在登录态时显示。
        */
        setUserLogined: function (logined) {
            panel.$.toggleClass('user-logined', !!logined);
        },
    };


});







