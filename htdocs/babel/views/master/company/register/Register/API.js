/*
* babel time: 2020-10-19 16:41:38
*
* source md5: DF046AF922FE84336C14F47A662C5471
*
* source file: htdocs/views/master/company/register/Register/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Register/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    var toast = KISP.create('Toast', {
        duration: 1500
    });

    return {
        'on': emitter.on.bind(emitter),

        post: function post(opt) {
            var api = new API('web/user/reg_enterprise_new', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('注册中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    toast.show('注册企业成功', function () {
                        emitter.fire('success', []);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('注册企业失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('注册企业错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'enterprise_name': opt.name
            });
        }

    };
});