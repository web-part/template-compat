/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 0E38019F973C3324D2A14AF4E95F6970
*
* source file: htdocs/views/master/product/list/Products/dialog/active/Active/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Products/Active/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var RSA = require('RSA');

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
        * 提交激活。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *       form: {},       //表单信息。
        *   };
        */
        post: function post(opt) {
            var api = new API('service/kiswebapp/web_kisapiserv_prodinst_act', {
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

                    toast.show('激活成功', function () {
                        emitter.fire('success', [data]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('激活产品失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('激活产品错误: 网络繁忙，请稍候再试');
                }
            });

            var productsn = RSA.encrypt(opt.form['sn']);
            var cdkey = RSA.encrypt(opt.form['cdkey']);

            api.post({
                'tid': opt.company.origin['tid'], //用户企业 ID
                'productsn': productsn, //产品序列号，形如: 2910361853
                'cdkey': cdkey, //产品 CDkey
                'productid': opt.product.origin['product_id'], //产品 ID，形如：S1S052S001
                'pid': opt.product.origin['pid'] //产品实例 ID
            });
        }

    };
});