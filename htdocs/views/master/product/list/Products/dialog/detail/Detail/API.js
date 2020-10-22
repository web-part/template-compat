
define('/Products/Detail/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });

    var toast = null;


    return {
        'on': emitter.on.bind(emitter),

        get: function (opt) {
            var api = new API('web/product/get_product_detail', {
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

                    emitter.fire('success', [data]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品详情失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品详情错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);

        },


    };


});