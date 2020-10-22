
define('/Companys/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = null;

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });



    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('web/login/get_enterprise_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading = loading || KISP.create('Loading', {
                        mask: 0,
                    });

                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data.map(function (item) {

                        return {
                            'avatar': item['avatar'],               //企业头像。
                            'name': item['name'],                   //企业名字。
                            'count': item['use_prod_num'] || 0,     //使用产品数量。
                            'status': item['org_status'],           //企业认证状态，0为未认证，1为审核中，2通过认证，3未通过审核（认证失败）。
                            'proNum': item['prod_num'],             //产品实例数量。
                            'origin': item,
                        };

                    });

                    emitter.fire('success', [list]);



                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业列表失败: {0}', msg, function () {
                        var list = [];
                        emitter.fire('success', [list]); //这里发送个空列表。
                    });

                },

                'error': function () {
                    KISP.alert('获取企业列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post();

        },
        delete: function (data) {
            var api = new API('web/org/to_del', {
                //proxy: true,
            });

            api.on({
                'request': function () {
                    loading = loading || KISP.create('Loading', {
                        mask: 0,
                    });

                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('删除常用企业成功', function () {
                        emitter.fire('delete-success');
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('删除常用企业失败: {0}', msg, function () {
                        var list = [];
                        emitter.fire('success', [list]); //这里发送个空列表。
                    });

                },

                'error': function () {
                    KISP.alert('删除常用企业错误: 网络繁忙，请稍候再试');
                },
            });
            api.post({
                'tid': data.origin.tid,
            });

        },

    };


});