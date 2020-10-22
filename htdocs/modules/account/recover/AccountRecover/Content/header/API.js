
define('/AccountRecover/Content/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();
    var loading = KISP.create('Loading', {
        mask: 0,
    });

    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('web/product/get_product_back_up_list', {
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
                    var list = data || [];
                    emitter.fire('success', [list]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': data.tid,
                'prod_id': data.prod_id,
            });

        },


    };


});