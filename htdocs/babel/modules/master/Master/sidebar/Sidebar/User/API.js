/*
* babel time: 2020-10-19 16:42:31
*
* source md5: E77162886A4B78650099AB7E2211DAF4
*
* source file: htdocs/modules/master/Master/sidebar/Sidebar/User/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Master/Sidebar/User/API', function (require, module, exports) {
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
        on: emitter.on.bind(emitter),

        /**
        * 退出登录。
        */
        logout: function logout() {
            var api = new API('web/login/login_out', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('退出中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    emitter.fire('success', 'logout', []);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('退出失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('退出错误: 网络繁忙，请稍候再试');
                }
            });

            api.post();
        },

        /**
        * 切换用户角色。
        */
        switch: function _switch(role) {
            var targetRole = role == 1 ? 2 : 1;

            var api = new API('web/login/check_login', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('切换中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    emitter.fire('success', 'switch', [targetRole]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('切换失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('切换错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'role': targetRole
            });
        }

    };
});