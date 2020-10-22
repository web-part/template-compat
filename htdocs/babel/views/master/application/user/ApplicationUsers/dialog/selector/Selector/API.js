/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 361B0DFD01BE85DC9158DE3B1DF4FBE3
*
* source file: htdocs/views/master/application/user/ApplicationUsers/dialog/selector/Selector/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/ApplicationUsers/Selector/API', function (require, module, exports) {
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
        * 获取云之家用户列表。
        */
        get: function get(opt) {

            var api = new API('web/user/get_yunzhijia_list', {
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
                    var list = data['user_list'] || [];
                    emitter.fire('success', 'get', [list, {
                        'no': opt.no,
                        'size': opt.size,
                        'total': data['count'], //总记录数。
                        'ifSearch': opt.ifSearch,
                        'ifGet': opt.ifGet,
                        'ifAdd': opt.ifAdd,
                        'phone': opt.mobile
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取云之家用户列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取云之家用户列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.companyId,
                'page': opt.no, //页码，即第几页。
                'page_size': opt.size, //一页展示多条数据，默认20条。  最大支持到100。    暂时不分页。
                'mobile': opt.mobile
            });
        },

        /**
        * 添加云之家用户到应用用户列表中。
        */
        post: function post(opt, list) {
            var api = new API('web/apply/addAccUser', {
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
                    toast.show('添加成功', function () {
                        emitter.fire('success', 'post', [data]);
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('添加云之家用户到应用用户列表中失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function error() {
                    KISP.alert('添加云之家用户到应用用户列表中错误: 网络繁忙，请稍候再试', function () {
                        emitter.fire('fail', 'post');
                    });
                }
            });

            list = list.map(function (item) {
                return {
                    'mobile': item.phone,
                    'user_name': item.name,
                    'uid': item.uid,
                    'gender': item.gender //性别默认传2 用于纷享销客对接
                };
            });

            list = JSON.stringify(list);
            list = encodeURIComponent(list);

            api.post({
                'tid': opt.company.origin['tid'],
                'prod_id': opt.product.origin['prod_id'],
                'slv_prod_id': opt.application.origin['slv_prod_id'],
                'user_list': list
            });
        }

    };
});