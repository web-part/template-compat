/*
* babel time: 2020-10-19 16:42:31
*
* source md5: E4C9DC396389BDBAA02107639CC98A27
*
* source file: htdocs/modules/account/recover/AccountRecover/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountRecover/API', function (require, module, exports) {
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

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 恢复账套。
        */
        post: function post(opt) {
            var api = new API('web/product/restore_account', {
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
                    toast.show('恢复成功', function () {
                        emitter.fire('success', [data]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('恢复账套失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function error() {
                    KISP.alert('恢复账套错误: 网络繁忙，请稍候再试');
                }
            });
            api.post(opt);
        }
    };
});