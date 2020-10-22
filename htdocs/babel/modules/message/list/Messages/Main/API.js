/*
* babel time: 2020-10-19 16:42:32
*
* source md5: ED5F5376B90D6A3B7EA3F5BCD73BD7EF
*
* source file: htdocs/modules/message/list/Messages/Main/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Messages/Main/API', function (require, module, exports) {
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
        * 获取消息详情。
        *   item = {};  //列表中的项。
        */
        get: function get(item) {

            var api = new API('web/notice/get_notice_detail', {
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

                    data = {
                        'title': data['FTitle'],
                        'content': data['FContent'],
                        'team': data['FAuthor'],
                        'time': data['FSendTime'],
                        'type': data['FType'],

                        'origin': data
                    };

                    emitter.fire('success', 'get', [data, item]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取消息详情失败: {0}(错误码: {1})', msg, code);
                },

                'error': function error() {
                    KISP.alert('获取消息详情错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'notice_id': item.id
            });
        }

    };
});