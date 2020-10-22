/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 85963EE6F03D11BCAD0D0AF54ECBF734
*
* source file: htdocs/views/master/application/list/Application/dialog/bind/Bind/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Application/Bind/API', function (require, module, exports) {
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

        get: function get(opt) {

            var api = new API('web/apply/accList', {
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
                            "origin": item,
                            "name": item['account_name'],
                            "number": item['account_no'],
                            "status": item['bind_status']
                        };
                    });
                    emitter.fire('success', 'get', [list, {
                        'total': data.count,
                        'page': data.page,
                        'pagesize': data.pagesize
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.product.origin.tid, //企业id
                'prod_id': opt.product.origin.prod_id, //产品实例id
                'slv_prod_id': opt.application.origin.slv_prod_id, //产品添加ID
                'page': opt.page,
                'pagesize': opt.pagesize
            });
        },

        bind: function bind(opt) {

            var api = new API('web/apply/bindAcc', {
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
                    toast.show('绑定账套成功', function () {
                        emitter.fire('success', 'bind');
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('绑定账套失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('绑定账套错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.product.origin.tid, //企业id
                'prod_id': opt.product.origin.prod_id, //产品实例id
                'slv_prod_id': opt.application.origin.slv_prod_id, //产品添加ID
                'account_id': opt.accountid //账套id
            });
        }

    };
});