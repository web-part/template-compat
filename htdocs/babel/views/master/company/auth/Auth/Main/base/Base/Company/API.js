/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 51E122D0011C3A4B4E41E1F8948663B6
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Company/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Auth/Main/Base/Company/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    return {
        'on': emitter.on.bind(emitter),

        get: function get(data) {
            var api = new API('web/product/search_ent', {
                proxy: true
            });

            api.on({
                'success': function success(data, json, xhr) {
                    var list = data || [];

                    emitter.fire('success', [list]);
                },

                'fail': function fail(code, msg, json) {
                    // KISP.alert('搜索失败: {0}', msg);
                },

                'error': function error() {
                    // KISP.alert('搜索错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                keyword: data
            });
        }

    };
});