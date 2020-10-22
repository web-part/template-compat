/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 7FF30184803A122EA444C73ABC626D86
*
* source file: htdocs/modules/message/dialog/Message/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Message/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取最新的系统消息内容和未读消息个数
        */
        get: function get() {

            var api = new API('web/notice/get_new_notice', {
                //proxy: 'get_new_notice.js',
                proxy: true
            });

            api.on({
                'request': function request() {
                    //不需要 loading
                },

                'response': function response() {},

                'success': function success(data, json, xhr) {
                    var item = data['new_notice'] || {}; //没消息时，后台竟然返回一个空数组。
                    var count = data['no_read_num'] || 0;
                    var id = item['FNoticeID'];

                    item = id ? {
                        'id': id,
                        'title': item['FTitle'],
                        'origin': item
                    } : null;

                    emitter.fire('success', 'get', [count, item]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取最新消息失败: {0}(错误码: {1})', msg, code);
                },

                'error': function error() {
                    KISP.alert('获取最新消息错误: 网络繁忙，请稍候再试');
                }
            });

            api.post();
        }

    };
});