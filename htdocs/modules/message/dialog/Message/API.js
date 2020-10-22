
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
        get: function () {


            var api = new API('web/notice/get_new_notice', {
                //proxy: 'get_new_notice.js',
                proxy: true,
            });


            api.on({
                'request': function () {
                    //不需要 loading
                },

                'response': function () {

                },

                'success': function (data, json, xhr) {
                    var item = data['new_notice'] || {};   //没消息时，后台竟然返回一个空数组。
                    var count = data['no_read_num'] || 0;
                    var id = item['FNoticeID'];


                    item = id ? {
                        'id': id,
                        'title': item['FTitle'],
                        'origin': item,
                    } : null;

                    emitter.fire('success', 'get', [count, item]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取最新消息失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取最新消息错误: 网络繁忙，请稍候再试');
                },
            });


            api.post();

        },

      



    };


});