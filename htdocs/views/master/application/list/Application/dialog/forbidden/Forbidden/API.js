﻿
define('/Application/Forbidden/API', function (require, module, exports) {
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
             * 获取纷享销客用户列表。
             */
        get: function (opt) {

            var api = new API('web/apply/userList', {
                'proxy': true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data || [];

                    list = list.map(function (item) {
                        return {
                            'phone': item['mobile'],
                            'name': item['user_name'],
                            'status': item['status'],           //账套状态，0为禁用，1为启用，2为删除',
                            'isMananger': item['is_manager'],           //是否为管理员，0为普通用户，1为管理员',
                            'origin': item,
                        };
                    });


                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取用户列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取用户列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post(opt);

        },



        /**
        * 设置用户状态。
        */
        post: function (opt) {

            var api = new API('web/user/change_user_status', {
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
                    emitter.fire('success', 'set', 'status', [opt]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置用户状态失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置用户状态错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.meta.company.origin['tid'],               //企业ID
                'prod_id': opt.meta.product.origin['prod_id'],       //产品ID
                'account_id': opt.meta.slvId, //应用ID
                'account_uid': opt.userid,  //需要被禁用的账套用户UID
                'status':0,                  //用户状态，0为禁用，1为启用，2为删除

            });

        },


    };


});