﻿
define('/Auth/Main/Base/Company/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    return {
        'on': emitter.on.bind(emitter),

        get: function (data) {
            var api = new API('web/product/search_ent', {
                proxy: true,
            });


            api.on({
                'success': function (data, json, xhr) {
                    var list = data || [];

                    emitter.fire('success', [list]);

                },

                'fail': function (code, msg, json) {
                    // KISP.alert('搜索失败: {0}', msg);
                },

                'error': function () {
                    // KISP.alert('搜索错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                keyword:data,
            });

        },


    };


});