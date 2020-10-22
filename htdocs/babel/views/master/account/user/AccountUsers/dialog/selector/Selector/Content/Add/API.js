/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 7CD3BF8A4BCB87B8F82BE0C0EA3896D5
*
* source file: htdocs/views/master/account/user/AccountUsers/dialog/selector/Selector/Content/Add/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountUsers/Selector/Content/Add/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0
    });

    var msg$text = {
        'Invalid loginname': '非法登录名，请检查手机号是否存在。'
    };

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 添加云之家用户。
        */
        post: function post(item) {
            var api = new API('web/user/add_yunzhijia_user', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('添加中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    emitter.fire('success', 'post', [{
                        'uid': data.uid,
                        'phone': item.phone,
                        'name': item.name,
                        'email': item.email
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    msg = msg$text[msg] || msg;

                    KISP.alert('添加云之家用户失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('添加云之家用户错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': item.companyId,
                'mobile': item.phone,
                'user_name': item.name,
                'email': item.email || '',
                'gender': 2 //默认传2 用于纷享销客对接
            });
        },

        /**
        * 根据手机号拉取用户信息。
        */
        get: function get(phone) {
            var api = new API('web/user/check_user_is_reg', {
                //proxy: 'success.js',
            });

            api.on({
                'request': function request() {
                    loading.show('检测中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    //var $String = KISP.require('String');
                    //var name = $String.random();

                    var has = data['is_exist'] == 1;
                    var name = has ? '(已注册)' : '';

                    emitter.fire('success', 'get', [{
                        'name': name
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    emitter.fire('success', 'get', [{}]);
                },

                'error': function error() {
                    KISP.alert('检测用户错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'mobile': phone
            });
        }

    };
});