/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 24C4EF9776D6D6F5D298B66E2B3ACBA4
*
* source file: htdocs/views/master/product/list/Products/dialog/buy/Buy/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Products/Buy/API', function (require, module, exports) {
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
        mask: 0,
        icon: 'close',
        width: 350
    });

    var defaults = KISP.data(module.id);

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 校验服务商编码。
        *   opt = {
        *       value: '',      //服务商编码。
        *       product: {},    //后台返回的原始的产品信息。
        *   };
        */
        verify: function verify(opt, fn) {
            var api = new API('web/kiso2o/check_partner', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('校验中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    if (data['exist'] == 0) {
                        var msg = '\u7F16\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165\u6216\u7531\u91D1\u8776\u4E3A\u60A8\u5206\u914D';
                        toast.show(msg, function () {
                            emitter.fire('success', 'verify', []); //这里当作成功，让外面清空内容。
                        });

                        return;
                    }

                    var info = {
                        'value': opt.value,
                        'name': data['partner_name'] //已经存在的伙伴编码会返回伙伴名称。
                    };

                    if (fn) {
                        fn(info);
                    } else {
                        emitter.fire('success', 'verify', [info]);
                    }
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('校验服务商编码失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('校验服务商编码错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'partner_code': opt.value,
                'pid': opt.product['pid'] //产品实例 ID
            });
        },

        /**
        * 检查商机。
        * 仅针对旗舰版。
        *   opt = {
        *       product: {},    //后台返回的原始的产品信息。
        *   };
        */
        check: function check(opt, fn) {
            var api = new API('web/kiso2o/check_opp', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('商机校验中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    var info = null;

                    //是不是商机类产品，1为商机产品。
                    if (data['is_opp'] == 1) {
                        info = {
                            'code': data['partner_code'], //如果是商机类产品会返回伙伴编码，单点登录需要传递。
                            'name': data['partner_name'] //伙伴的名字，前端弹窗需要。
                        };
                    }

                    emitter.fire('success', 'check', [info]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('商机校验失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('商机校验错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.product['tid'],
                'product_code': 'PDM-20180920-11903' //产品编码，旗舰版需要传递PDM-20180920-11903
            });
        },

        /**
        * 获取跳转到 kis-o2o 的链接。
        *   opt = {
        *       value: '',      //可选，服务商编码。
        *       product: {},    //必选，后台返回的原始的产品信息。
        *   };
        */
        getUrl: function getUrl(opt) {

            var api = new API('web/kiso2o/login_by_kisyun', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('加载中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    var url = data.url;

                    emitter.fire('success', 'url', [url, defaults]);
                },

                'fail': function fail(code, msg, json) {

                    KISP.alert(msg);
                },

                'error': function error() {
                    KISP.alert('获取跳转到 KIS-O2O 的链接错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'type': 3, //1为公有云产品加站加模或者减站减模，2为公有云产品续费即续租，3为新购。
                'pid': opt.product['pid'], //产品实例 ID
                'partner_code': opt.value || '', //服务商编码。
                'test': defaults.test //为了区分跳到不同的环境。
            });
        }

    };
});