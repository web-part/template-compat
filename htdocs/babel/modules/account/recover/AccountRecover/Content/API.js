/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 4CD723622527695B30895647E425FD24
*
* source file: htdocs/modules/account/recover/AccountRecover/Content/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountRecover/Content/API', function (require, module, exports) {
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
            var api = new API('web/product/get_back_up_pan_list', {
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
                    emitter.fire('success', [list, 'manual']);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取手动备份账套列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取手动备份账套列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(data);
        },
        // 获取自动备份数据
        getAuto: function getAuto(data) {
            var api = new API('web/product/get_auto_back_up_list', {
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

                    list = list.map(function (item) {
                        return {
                            'back_name': item.name,
                            'size': item.size,
                            'back_time': item.create_time,
                            'bak_file_path': item['bak_file_path'],
                            'cloud_type': item['cloud_type'],
                            'origin': item
                        };
                    });

                    emitter.fire('success', [list, 'auto']);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取自动备份账套列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取自动备份账套列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post(data);
        }

    };
});