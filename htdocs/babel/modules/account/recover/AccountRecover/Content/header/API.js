/*
* babel time: 2020-10-19 16:42:31
*
* source md5: B092F064B82E66B7F3216E63C066EFF2
*
* source file: htdocs/modules/account/recover/AccountRecover/Content/header/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountRecover/Content/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = KISP.create('Loading', {
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        get: function get(data) {
            var api = new API('web/product/get_product_back_up_list', {
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
                    var list = data || [];
                    emitter.fire('success', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取产品失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取产品错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': data.tid,
                'prod_id': data.prod_id
            });
        }

    };
});