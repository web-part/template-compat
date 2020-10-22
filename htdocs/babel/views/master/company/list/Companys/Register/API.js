/*
* babel time: 2020-10-19 16:41:38
*
* source md5: EE66C2BC10B1B44D0AAFF54BE01472E4
*
* source file: htdocs/views/master/company/list/Companys/Register/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Companys/Register/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = KISP.create('Loading', {
        mask: 0
    });

    var toast = null;

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取企业云平台注册企业的单点登录接口。
        */
        get: function get(data) {
            var api = new API('web/user/reg_enterprise', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    var url = data['redirect_url'];

                    emitter.fire('success', [url]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取企业云平台注册企业的单点登录接口失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取企业云平台注册企业的单点登录接口错误: 网络繁忙，请稍候再试');
                }
            });

            api.post();
        }

    };
});