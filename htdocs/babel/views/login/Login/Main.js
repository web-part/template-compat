/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 76D9F012B87E3D96DBADF47CE560DC30
*
* source file: htdocs/views/login/Login/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Login/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var Form = module.require('Form');
    var Banner = module.require('Banner');
    var Download = module.require('Download');
    var QRCode = module.require('QRCode');
    var API = module.require('API');

    var meta = {
        third: null //第三方平台传进来的数据包。
    };

    panel.on('init', function () {
        var isQR = false; //当前是否切换到二维码面板。

        panel.$.on('click', '[data-cmd="switch"]', function () {
            isQR = !isQR;
            panel.$.toggleClass('scan-login', isQR);

            if (isQR) {
                var role = Form.getRole();

                QRCode.render({
                    'role': role
                });
            }
        });
    });

    panel.on('init', function () {

        API.on('login', {
            'fail': function fail() {
                Form.resetCode();
            },

            'self': function self(data) {
                panel.fire('login', 'self', [data]);
            },

            //登录成功，包括内部的和第三方的。
            'success': function success(data) {
                var type = meta.third ? 'third' : 'self';

                panel.fire('login', type, [data]);
            }

        });

        // Banner.on('cmd', function (cmd) {   //目前未登录不允许查看日志
        //     panel.fire(cmd);
        // });


        Form.on({
            //提交登录。
            'submit': function submit(form) {
                API.login(form, meta.third);
            },

            //跳到重置密码。
            'reset': function reset() {
                panel.fire('reset', [meta.third]);
            },

            //跳到立即注册
            'sign-up': function signUp() {
                panel.fire('sign-up', [meta.third]);
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       
    *   };
    */
    panel.on('render', function (data) {
        data = data || KISP.data('login') || {};

        var third = meta.third = data.third;
        var form = $Object.remove(data, 'third');

        Form.render(form, third);
        Banner.render();
        Download.render();

        panel.fire('render');
    });

    return {};
});