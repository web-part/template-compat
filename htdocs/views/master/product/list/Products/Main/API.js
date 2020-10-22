
define('/Products/Main/API', function (require, module, exports) {
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

    var defaults = KISP.data(module.id);


    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取指定企业的产品列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function (opt) {
            var api = new API('web/product/get_product_order_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data.map(function (item, index) {

                        var expire = item['expire_time'] || ''; //后台返回的可能是 null。
                        expire = expire.split(' ')[0]; //取日期部分。

                        var status = item['status'];
                        var usedSize = item['account_size_used'] || 0;
                        var actived = item['type'] == 1; //产品类型，1为已激活（已购正式版），2为未激活（赠送正式版）',

                        return {
                            'name': item['product_name'],
                            'count1': item['used_account_num'], //已用账套数。
                            'count2': item['account_num'],      //可用账套数。
                            'users': item['user_count'],        //用户数量。
                            'size': item['account_size'],       //空间大小。
                            'usedSize': usedSize,               //已空间大小。
                            'expire': expire,                   //到期时间。
                            'area': item['region_name'],        //地区名称。
                            'warnMsg': item['warn_msg'],        //
                            'status': status,                   //正在使用产品状态，0为禁用，1为启用(正常使用)。
                            'actived': actived,                 //是否已激活。 
                            'model': item['cloud_model'],
                            'type': item['type'],               //产品类型，1 为已激活（已购正式版），2为未激活（赠送正式版）。
                            'hide': item['hide'],
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],   //用户企业 ID
            });

        },

        /**
        * 更新服务。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *   };
        */
        update: function (opt) {
            var api = new API('service/kiswebapp/web_kisapiserv_prodinst_update', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('更新中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('更新成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('更新服务失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('更新服务错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],               //用户企业 ID
                'productid': opt.product.origin['product_id'],  //产品 ID，形如：S1S052S001
                'pid': opt.product.origin['pid'],               //产品实例 ID
            });

        },

        /**
        * 切换私有云。
        */
        change: function (opt) {
            var api = new API('service/kiswebapp/web_change_cloudmod', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('切换中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('切换私有云成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('切换私有云失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('切换私有云错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 启用公有云。
        */
        toPub: function (opt) {
            var api = new API('service/kiswebapp/web_change_cloudmod', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('切换中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('启用公有云成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    if (code == '2014') {
                        KISP.alert(msg, function () {
                            emitter.fire('success', 'refresh');
                        });

                    }
                    KISP.alert('启用公有云失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('启用公有云错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 保存产品名称修改。
        */
        save: function (opt, value) {
            var api = new API('web/product/change_product_name', {
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
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('保存产品名称失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('保存产品名称错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.origin['tid'],               //用户企业 ID
                'prod_name':value,  //产品名称
                'pid': opt.origin['pid'],               //产品实例 ID
            });
        },

        /**
        * 获取跳转到 kis-o2o 的链接。
        *   type: 1,    //跳转类型，1：新购。  2：加站加模。  3：续费。
        *   item: {},   //产品信息。
        */
        o2o: function (type, item, isConfirmed) {

            var api = new API('web/kiso2o/login_by_kisyun', {
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

                    var url = data.url;

                    emitter.fire('success', 'kis-o2o', [url, defaults]);

                },

                'fail': function (code, msg, json) {

                    //前端在单点登录收到错误代码为409的时候弹出确认框
                    if (code == 409) {
                        KISP.confirm({
                            'text': msg,
                            'buttons': ['继续购买', '取消'],
                            'ok': function () {
                                module.exports.o2o(type, item, true); //再次调用。
                            },
                        });
                    }
                    else {
                        KISP.alert(msg); //需求说：只显示提示消息即可。
                    }


                },

                'error': function () {
                    KISP.alert('获取跳转到 KIS-O2O 的链接错误: 网络繁忙，请稍候再试');
                },
            });

            //公有云产品。
            var type$dest = {
                '1': 3,   //新购。 
                '2': 1,   //加站加模（减站减模）。
                '3': 2,   //续费（续租）。
            };


            api.post({
                'type': type$dest[type],        //1为公有云产品加站加模或者减站减模，2为公有云产品续费即续租。
                'pid': item.origin['pid'],      //产品实例 ID。

                'test': defaults.test,          //为了区分跳到不同的环境。
                'is_xuzu': isConfirmed ? 1 : 0, //是否强行续租，1为强行续租。
            });
        },

    };


});