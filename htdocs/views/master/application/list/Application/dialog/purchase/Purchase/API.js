
define('/Application/Purchase/API', function (require, module, exports) {
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
        * 获取应用。
        */
        get: function (opt) {


            var api = new API('web/apply/licenseList', {
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
                    var list = data.map(function (item, index) {
                        return {
                            'sn': item['slv_prod_sn'],
                            'num': item['user_num'],
                            'date': item['expired_date'],
                            'origin': item,
                        };
                    })
                    emitter.fire('success', 'get', [list]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取应用购买详情失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取应用购买详情错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);
        },

    };


});