/*
* babel time: 2020-10-19 16:42:31
*
* source md5: D342BE650C42DB7727C6D5B667BE31B5
*
* source file: htdocs/modules/header/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

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
        env: null //外面传进来的数据。
    };

    panel.on('init', function () {
        Nav.on('cmd', function (cmd) {

            if (cmd == 'my-order') {
                API.getUrl();
            } else {
                panel.fire(cmd);
            }
        });

        Logo.on('cmd', function (cmd) {
            panel.fire(cmd);
        });

        API.on('success', {
            //获取跳转地址成功。
            'url': function url(_url, defaults) {
                if (defaults.test == 1) {
                    window.open(_url);
                } else {
                    console.log(_url);
                }
            }
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
        setMessageCount: function setMessageCount(count) {
            Nav.render(count, meta.env);
        },

        /**
        * 设置用户是否已处于登录状态。
        * 用于显示或隐藏头部的相关图标，如 `通知` 需要在登录态时显示。
        */
        setUserLogined: function setUserLogined(logined) {
            panel.$.toggleClass('user-logined', !!logined);
        }
    };
});