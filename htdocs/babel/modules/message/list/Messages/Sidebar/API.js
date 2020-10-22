/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 2C4523747CC441CB74DFB0BD906033E8
*
* source file: htdocs/modules/message/list/Messages/Sidebar/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Messages/Sidebar/API', function (require, module, exports) {
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
        * 获取消息列表。
        */
        get: function get() {

            var api = new API('web/notice/get_notice_list', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show('加载中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    var list = data || [];

                    list = data['notice_list'] || [];

                    list = list.map(function (item, index) {
                        var date = item['FSendTime'].split(' ')[0];

                        return {
                            'id': item['FNoticeID'],
                            'type': item['FType'],
                            'status': item['FStatus'],
                            'summary': item['FTitle'],
                            'date': date,
                            'origin': item
                        };
                    });

                    emitter.fire('success', 'get', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取消息列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function error() {
                    KISP.alert('获取消息列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                type: '', //类型。 1 为系统信息，2 为个人消息。 不传递表示查询所有的。
                status: '', //状态。 0 为未读，1 为已读。 不传递表示查询所有的状态。
                page: 1, //第几页，默认第 1 页。
                page_size: 1000 //每页返回多少条，默认 20 条。 暂时不分页。
            });
        },

        /**
        * 前端过滤。
        *   list: [],       //全部列表。
        *   filters: [      //过滤条件。
        *       
        *   ],      
        */
        filter: function filter(list, filters) {
            console.log(filters);

            var statusList = []; //状态的过滤条件列表。
            var typeList = []; //类型的过滤条件列表。

            filters.forEach(function (item) {
                if (!item.checked) {
                    return;
                }

                if ('status' in item) {
                    statusList.push(item);
                    return;
                }

                if ('type' in item) {
                    typeList.push(item);
                    return;
                }
            });

            var statusCount = statusList.length;
            var typeCount = typeList.length;

            //所有过滤条件都没选中。
            if (!statusCount && !typeCount) {
                return [];
            }

            //按状态过滤，即未读、已读。
            if (statusCount > 0) {
                list = list.filter(function (item) {
                    var found = statusList.some(function (con) {
                        return item.status == con.status;
                    });

                    return found;
                });
            }

            //按类型过滤，即系统、个人。
            if (typeCount > 0) {
                list = list.filter(function (item) {
                    var found = typeList.some(function (con) {
                        return item.type == con.type;
                    });

                    return found;
                });
            }

            return list;
        }

    };
});