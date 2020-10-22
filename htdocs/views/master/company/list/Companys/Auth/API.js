
define('/Companys/Auth/API', function (require, module, exports) {
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

        /**
        * 获取企业云平台认证企业的单点登录接口。
        */
        get: function (companyId) {
            var api = new API('web/user/auth_enterprise', {
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
                    var url = data['redirect_url'];

                    emitter.fire('success', [url]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业云平台认证企业的单点登录接口失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取企业云平台认证企业的单点登录接口错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': companyId,
            });

        },


    };


});