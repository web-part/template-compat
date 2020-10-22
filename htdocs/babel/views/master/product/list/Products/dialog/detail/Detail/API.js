/*
* babel time: 2020-10-19 16:41:38
*
* source md5: A038C45FE0CDD871A530C3E360CB69F9
*
* source file: htdocs/views/master/product/list/Products/dialog/detail/Detail/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Products/Detail/API', function (require, module, exports) {
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

        get: function get(opt) {
            var api = new API('web/product/get_product_detail', {
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

                    emitter.fire('success', [data]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取产品详情失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取产品详情错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(opt);
        }

    };
});