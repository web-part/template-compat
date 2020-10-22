
define('/Updates/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
        container: `[data-panel="${module.parent.id}"]`,
    });


    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取列表。
        *   opt = {
        *       no: 1,      //要加载的页码。
        *       size: 6,    //每页的条数。
        *   };
        */
        get: function (opt) {


            var api = new API('web/notice/get_update_log', {
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
                    var list = data['log_list'] || [];

                    list = list.map(function (item, index) {
                        return {
                            'title': '新功能上线',           //这里暂时先固定。
                            'version': item['FVersion'],
                            'subTitle': item['FTitle'],
                            'time': item['FCurdatetime'],
                            'desc': item['FDesc'],
                            'url': item['FUrl'],
                            'cover': item['FCover'],
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list, {
                        'no': opt.no,
                        'size': opt.size,
                        'total': data['count'],
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取更新日志列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取更新日志列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'page': opt.no,
                'page_size': opt.size,
            });

        },



    };


});