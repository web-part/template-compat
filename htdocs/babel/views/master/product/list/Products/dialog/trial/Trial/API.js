/*
* babel time: 2020-10-19 16:41:38
*
* source md5: DD84D43495782C85A19786BA06A5CB9E
*
* source file: htdocs/views/master/product/list/Products/dialog/trial/Trial/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Products/Trial/API', function (require, module, exports) {
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

        /**
        * 免费试用。
        */

        post: function post(product) {
            var api = new API('web/product/try_product', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('试用提交中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    emitter.fire('success', [json.msg]);
                },

                'fail': function fail(code, msg, json) {
                    if (code == '405') {
                        emitter.fire('certify', [msg]);
                        return;
                    }

                    KISP.alert('免费试用失败: {0}', msg);
                    emitter.fire('fail');
                },

                'error': function error() {
                    KISP.alert('免费试用错误: 网络繁忙，请稍候再试');
                }
            });

            product = product.origin;

            api.post({
                'tid': product['tid'],
                'prod_id': product['prod_id']
            });
        }

    };
});