
define('/AccountUsers/Selector/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取云之家用户列表。
        */
        get: function (opt) {

            var api = new API('web/user/get_yunzhijia_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data['user_list'] || [];
                    emitter.fire('success', 'get', [list, {
                        'no': opt.no,
                        'size': opt.size,
                        'total': data['count'],   //总记录数。
                        'ifSearch': opt.ifSearch,
                        'ifGet': opt.ifGet,
                        'ifAdd': opt.ifAdd,
                        'phone':opt.mobile,
                    }]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取云之家用户列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取云之家用户列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.companyId,
                'page': opt.no,              //页码，即第几页。
                'page_size': opt.size,      //一页展示多条数据，默认20条。  最大支持到100。    暂时不分页。
                'mobile':opt.mobile,
            });

        },

        /**
        * 添加云之家用户到账套用户列表中。
        */
        post: function (opt, list) {
            var api = new API('web/user/add_account_user', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    toast.show('添加成功', function () {
                        emitter.fire('success', 'post', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('添加云之家用户到账套用户列表中失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function () {
                    KISP.alert('添加云之家用户到账套用户列表中错误: 网络繁忙，请稍候再试',function () { 
                        emitter.fire('fail', 'post');
                    });
                },
            });


            list = list.map(function (item) {
                return {
                    'mobile': item.phone,
                    'user_name': item.name,
                    'uid': item.uid,
                    'gender':item.gender,
                };
            });

            list = JSON.stringify(list);
            list = encodeURIComponent(list);
            

            api.post({
                'tid': opt.company.origin['tid'],
                'prod_id': opt.product.origin['prod_id'],
                'account_id': opt.account.origin['account_id'],
                'user_list': list,
            });

        },



    };


});