/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 8AAAFDF8F6D3C23D7DB9289FB7F517FB
*
* source file: htdocs/views/master/application/list/Application/dialog/add/Add/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Application/Add/API', function (require, module, exports) {
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
        * 获取应用。
        */
        get: function get(opt) {

            var api = new API('web/apply/appList', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    var list = data.list.map(function (item, index) {
                        return {
                            'name': item['slv_prod_name'],
                            'msg': item['slv_prod_msg'],
                            'origin': item
                        };
                    });
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取应用列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取应用列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(opt);
        },

        /**
        * 添加应用。
        */
        post: function post(opt) {

            var api = new API('web/apply/appAdd', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    toast.show('应用添加成功', function () {
                        emitter.fire('success', 'post');
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('添加应用失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('添加应用错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.product.origin.tid, //企业id
                'prod_id': opt.product.origin.prod_id, //产品实例id
                'slv_icrm_id': opt.application //应用产品id
            });
        }

    };
});