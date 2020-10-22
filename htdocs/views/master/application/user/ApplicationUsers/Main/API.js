
define('/ApplicationUsers/Main/API', function (require, module, exports) {
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


            api.post({
                'tid': opt.company.origin['tid'],                  //企业 id。
                'prod_id': opt.product.origin['prod_id'],          //产品 id。
                'slv_prod_id': opt.application.origin['slv_prod_id'],    //应用id。
            });

        },


        /**
        * 修改用户信息。
        */
        setInfo: function (opt) {

            var api = new API('web/apply/updateAccUser', {
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
                    toast.show('设置成功', function () {
                        emitter.fire('success', 'set', [opt]);

                    })
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置用户信息失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置用户信息错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

    };


});