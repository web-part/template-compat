
define('/Register/API', function (require, module, exports) {
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
    });




    return {
        'on': emitter.on.bind(emitter),

        post: function (opt) {
            var api = new API('web/user/reg_enterprise_new', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('注册中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('注册企业成功', function () {
                        emitter.fire('success', []);
                    });
                },

                'fail': function (code, msg, json) {
                    KISP.alert('注册企业失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('注册企业错误: 网络繁忙，请稍候再试');
                },
            });



            api.post({
                'enterprise_name': opt.name,
            });

        },


    };


});