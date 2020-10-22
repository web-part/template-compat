
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
        mask: 0,
    });;

    var toast = KISP.create('Toast', {
        text: '登录成功',
        duration: 1500,
        mask: 0,
    });;




    return {
        on: emitter.on.bind(emitter),


        /**
        * 退出登录。
        */
        logout: function () {
            var api = new API('web/login/login_out', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('退出中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'logout', []);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('退出失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('退出错误: 网络繁忙，请稍候再试');
                },
            });

            api.post();
        },

        /**
        * 切换用户角色。
        */
        switch: function (role) {
            var targetRole = role == 1 ? 2 : 1;

            var api = new API('web/login/check_login', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('切换中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'switch', [targetRole]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('切换失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('切换错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'role': targetRole,
            });
        },



    };


});