

KISP.panel('/Login/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var Form = module.require('Form');
    var Banner = module.require('Banner');
    var Download = module.require('Download');
    var QRCode = module.require('QRCode');
    var API = module.require('API');


    var meta = {
        third: null,    //第三方平台传进来的数据包。
    };



    panel.on('init', function () {
        var isQR = false; //当前是否切换到二维码面板。

        panel.$.on('click', '[data-cmd="switch"]', function () {
            isQR = !isQR;
            panel.$.toggleClass('scan-login', isQR);


            if (isQR) {
                var role = Form.getRole();

                QRCode.render({
                    'role': role,
                });
            }

        });
    });



    panel.on('init', function () {

        API.on('login', {
            'fail': function () {
                Form.resetCode();
            },

            'self': function (data) {
                panel.fire('login', 'self', [data]);
            },

            //登录成功，包括内部的和第三方的。
            'success': function (data) {
                var type = meta.third ? 'third' : 'self';

                panel.fire('login', type, [data]);
            },



        });


        // Banner.on('cmd', function (cmd) {   //目前未登录不允许查看日志
        //     panel.fire(cmd);
        // });


        Form.on({
            //提交登录。
            'submit': function (form) {
                API.login(form, meta.third);
            },

            //跳到重置密码。
            'reset': function () {
                panel.fire('reset', [meta.third]);
            },

            //跳到立即注册
            'sign-up': function () {
                panel.fire('sign-up', [meta.third]);
            },
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


    return {
        

    };


   



});