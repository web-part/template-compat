
define('/Messages/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });




    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取消息详情。
        *   item = {};  //列表中的项。
        */
        get: function (item) {


            var api = new API('web/notice/get_notice_detail', {
                proxy: true,

            });


            api.on({
                'request': function () {
                    loading.show('加载中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
    
                    data = {
                        'title': data['FTitle'],
                        'content': data['FContent'],
                        'team': data['FAuthor'],
                        'time': data['FSendTime'],
                        'type': data['FType'],

                        'origin': data,
                    };

                    emitter.fire('success', 'get', [data, item]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取消息详情失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取消息详情错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'notice_id': item.id,
            });

        },

      



    };


});