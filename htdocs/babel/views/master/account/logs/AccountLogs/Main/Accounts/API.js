/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 7D586BB4A6B029B8994A64DA39F855FF
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main/Accounts/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountLogs/Main/Accounts/API', function (require, module, exports) {
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
        * 获取账套删除记录列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function get(opt) {

            var api = new API('web/product/get_account_del_log', {
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

                    var list = data || [];

                    list = list.map(function (item) {

                        return {
                            'datetime': item['del_time'], //删除日期
                            'operator': item['operator'], //操作人。
                            'number': item['account_num'], //账套号。
                            'name': item['account_name'], //账套名字。
                            'phone': item['admin_mobile'], //删除账套的短信验证手机号码。
                            'user': item['admin_name'], //删除账套的短信验证人。
                            'ip': item['server_ip'], //服务器IP。
                            'origin': item
                        };
                    });

                    emitter.fire('success', 'get', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取账套删除记录失败: {0}(错误码: {1})', msg, code);
                },

                'error': function error() {
                    KISP.alert('获取账套删除记录错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //企业 id。
                'type': 1 //删除的类型，1为删除账套的记录，2为删除账套备份文件记录
            });
        }

    };
});