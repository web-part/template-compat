/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 30238606565FCEB6CA7CF5F229B4025A
*
* source file: htdocs/views/login/Login/Auto/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Login/Auto/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var MD5 = KISP.require('MD5');
    var LocalStorage = KISP.require('LocalStorage');

    var storage = new LocalStorage(module.id);
    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });;

    var toast = KISP.create('Toast', {
        text: '登录成功',
        duration: 1500,
        mask: 0
    });;

    return {

        login: function login(opt) {

            var api = API.create('service/kiswebapp/web_yzj_login_qrcode', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('登录中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('扫码登录成功', function () {

                        data.role = opt.role; //增加一个字段：用户角色。

                        emitter.fire('success', [data]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('扫码登录失败: {0}', msg, function () {
                        emitter.fire('fail');
                    });
                },

                'error': function error() {
                    KISP.alert('扫码登录错误: 网络繁忙，请稍候再试', function () {
                        emitter.fire('fail');
                    });
                }
            });

            //签名。
            opt = API.sign(opt);

            api.post(opt);
        },

        on: emitter.on.bind(emitter)

    };
});