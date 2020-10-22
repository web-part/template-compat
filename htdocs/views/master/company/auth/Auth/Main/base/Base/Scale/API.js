
define('/Auth/Main/Base/Scale/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();





    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('xxx', {
                proxy: 'auth/scale.js',
            });

            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];
                    emitter.fire('success', [list]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取企业规模列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取企业规模列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post();

        },


    };


});