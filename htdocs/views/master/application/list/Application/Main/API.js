
define('/Application/Main/API', function (require, module, exports) {
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
        * 获取指定企业的产品列表。
        *   opt = {
        *       company: {},    //企业信息。
        *   };
        */
        get: function (opt) {
            var api = new API('web/apply/appOrder', {
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
                    console.log(data);

                    var list = data.map(function (item, index) {

                        var expire = item['expired_date'] || ''; //后台返回的可能是 null。
                        expire = expire.split(' ')[0]; //取日期部分。

                        return {
                            'name': item['slv_prod_name'],
                            'users': item['user_num'],        //用户数量。
                            'expire': expire,                   //到期时间。
                            'warnMsg': item['warn_msg'],        //
                            'status': item['status'],
                            "bind": item['is_bind_acc'],
                            'type': item['type'],
                            'tag': item['slv_tag'],
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取应用列表错误: 网络繁忙，请稍候再试');
                },
            });
            api.post({
                'tid': opt.company.origin['tid'],   //用户企业 ID
                'prod_id': opt.product.origin['prod_id'], //产品 ID
            });

        },


        /**
        * 更新服务。
        */
        update: function (opt) {
            var api = new API('web/apply/updateServe', {
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
                    // 待完成
                    toast.show('更新成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                        // emitter.fire('success', 'update-fail', [opt.item]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert(`更新服务失败:${msg}`, function () {
                        if (code !== 303) {
                            return;
                        }
                        emitter.fire('update-fail', [opt.item]);  //code为303时需跳转添加用户

                    });

                },

                'error': function () {
                    KISP.alert('更新服务错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'slv_prod_id': opt.item.origin.slv_prod_id,	//产品添加ID
                'tid': opt.meta.company.origin.tid,        //企业id。
                'prod_id': opt.meta.product.origin.prod_id,    //产品id。
            });

        },
        /**
       * 获取微系列参数设置地址。
       */
        getwxlUrl: function (opt) {
            var api = new API('web/apply/weiSetting', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('跳转中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'get-wxlsuccess', [data]);


                },

                'fail': function (code, msg, json) {

                    KISP.alert(`跳转到参数设置失败:${msg}`);
                },

                'error': function () {
                    KISP.alert('跳转到参数设置错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
         * 获取应用管理地址。
         */
        getUrl: function (opt) {
            var api = new API('web/apply/thirdLogin', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('跳转中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', 'get-success', [data]);


                },

                'fail': function (code, msg, json) {

                    KISP.alert(`跳转到纷享销客失败:${msg}`);
                },

                'error': function () {
                    KISP.alert('跳转到纷享销客错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 删除应用。
        */
        delete: function (opt) {
            var api = new API('web/apply/appDel', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('删除中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('删除成功', function () {
                        emitter.fire('success', 'refresh', [data]);
                    });

                },

                'fail': function (code, msg, json) {

                    KISP.alert('删除应用失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('删除应用错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

        /**
        * 免费试用。
        *   opt = {
        *       slv_icrm_id:string,	//应用产品id
        *       slv_prod_id:string,	//产品添加ID
        *       tid: string,        //企业id。
        *       prod_id: string,    //产品id。
        *   };
        */

        test: function (opt) {
            var api = new API('web/apply/appTry', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('开通提交中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('开通成功', function () {
                        emitter.fire('success', 'refresh', [json.msg]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('开通应用失败: {0}', msg);
                    emitter.fire('fail');
                },

                'error': function () {
                    KISP.alert('开通应用错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },

    };


});