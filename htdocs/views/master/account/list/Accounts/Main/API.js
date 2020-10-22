
define('/Accounts/Main/API', function (require, module, exports) {
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
        * 获取账套列表。
        */
        getList: function (opt) {

            var api = new API('web/product/get_account_list', {
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
                    var list = data || [];

                    list = list.map(function (item) {

                        return {
                            'name': item['account_name'],           //账套名称。
                            'number': item['account_num'],          //账套号。
                            'count1': item['used_num'],             //已经创建的用户数。
                            'count2': item['user_count'],           //最大可以创建的用户数，跟产品的用户数一致。
                            'usedSize': item['used_account_size'],  //已经使用的空间大小
                            'totalSize': item['allow_account_size'],//分配的空间大小
                            'status': item['status'],               //账套状态
                            'remark': item['remark'],               //账套失败原因
                            'is_bind': item['is_bind_apply'],       //是否已绑定应用 0没绑定 1绑定分享销客
                            'origin': item,
                        };
                    });
                    emitter.fire('get', 'list', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],           //企业 id。
                'prod_id': opt.product.origin['prod_id'],   //产品 id。
            });


        },

        /**
        * 检测能否恢复账套。
        */
        checkRecover: function (opt) {

            var api = new API('web/product/check_is_can_create_account', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('检测中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var allow = data['is_can'] == 1;
                    var msg = json.msg;

                    //////////
                    //var allow = true;

                    if (allow) {
                        emitter.fire('check-recover', []);
                    }
                    else {
                        KISP.alert(msg);
                    }

                },

                'fail': function (code, msg, json) {
                    KISP.alert('检测恢复账套失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('检测恢复账套错误: 网络繁忙，请稍候再试');

                },
            });


            api.post({
                'tid': opt.company.origin['tid'],              //用户企业ID
                'prod_id': opt.product.origin['prod_id'],      //产品ID
                'prod_code': opt.product.origin['prod_code'],  //产品编码
            });

        },


        /**
        * 设置账套状态。
        * 即启用或禁用。
        */
        setStatus: function (opt) {
            var api = new API('web/product/change_account_status', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('设置中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('设置成功', function () {
                        emitter.fire('set', 'status', [opt]);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置账套状态失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置账套状态错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'], //用户企业ID
                'account_id': opt.account.origin['account_id'],//账套 id。
                'status': opt.enabled ? 2 : 5,  //账套的状态值，2为启用，5为禁用，其他值无效

            });
        },

        /**
        * 校验账套用户在线状态。
        */
        checkUser: function (opt) {
            var api = new API('service/kiswebapp/web_check_acctuser_onstatus', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('检查中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('check-user', [opt]);
                },

                'fail': function (code, msg, json) {

                    if (code == '2013') {
                        KISP.alert(msg);
                        return;
                    }
                    KISP.alert('删除账套失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('删除账套错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.tid,
                'acctid': opt.item.origin['account_id'],
            });
        },



        /**
        * 设置自动备份。
        */
        setAutoBak: function (opt) {
            var api = new API('web/product/open_back_up', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('设置中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('设置成功', function () {
                        emitter.fire('set', 'auto-bak', [opt]);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('设置自动备份失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('设置自动备份错误: 网络繁忙，请稍候再试');
                },
            });


            var account = opt.account.origin;


            api.post({
                'tid': opt.company.origin['tid'],       //用户企业ID
                'account_id': account['account_id'],    //账套 id。
                'is_open': opt.enabled ? 1 : 0,         //是否开启自动备份，0为不开启，1为开启
            });
        },

        /**
        * 发起手动备份。
        */
        manualBak: function (opt) {

            var api = new API('web/product/account_back_up', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('备份中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('set', 'manual-bak', []);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('备份失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('备份错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],               //用户企业ID
                'account_id': opt.account.origin['account_id'], //账套 id。
            });
        },

        /**
        * 恢复中刷新状态添加管理员账号。
        */
        refresh: function (opt, accountId) {

            var api = new API('web/product/create_account_user_by_restore', {
                proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('刷新中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, msg, json) {
                    emitter.fire('has-refresh');
                },

                'fail': function (code, msg, json) {
                    KISP.alert(msg);
                },

                'error': function () {
                    KISP.alert('刷新错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],              //用户企业ID
                'account_id': accountId,                       //账套 id。
                'prod_id': opt.product.origin['prod_id'],      //产品 id。
            });
        },


        /**
        * 保存账套名称修改。
        */
        save: function (opt, value) {
            var api = new API('web/product/change_account_name', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('保存中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('保存成功', function () {
                        emitter.fire('save', [opt]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('保存账套名称失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('保存账套名称错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.origin['tid'],               //用户企业 ID
                'account_name': value,                  //账套名称
                'account_id': opt.origin['account_id'], //产品实例 ID
            });

        },



    };


});