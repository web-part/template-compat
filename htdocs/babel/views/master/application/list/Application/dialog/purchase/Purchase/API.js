/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 347A14051B18B1EA4BD24E853DCCDFD2
*
* source file: htdocs/views/master/application/list/Application/dialog/purchase/Purchase/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Application/Purchase/API', function (require, module, exports) {
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

            var api = new API('web/apply/licenseList', {
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
                    var list = data.map(function (item, index) {
                        return {
                            'sn': item['slv_prod_sn'],
                            'num': item['user_num'],
                            'date': item['expired_date'],
                            'origin': item
                        };
                    });
                    emitter.fire('success', 'get', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取应用购买详情失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取应用购买详情错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(opt);
        }

    };
});