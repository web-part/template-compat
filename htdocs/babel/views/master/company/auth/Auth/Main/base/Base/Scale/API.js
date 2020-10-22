/*
* babel time: 2020-10-19 16:41:38
*
* source md5: C8BA775761A4EA97BF64EF90A460D0AE
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Scale/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Auth/Main/Base/Scale/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    return {
        'on': emitter.on.bind(emitter),

        get: function get(data) {
            var api = new API('xxx', {
                proxy: 'auth/scale.js'
            });

            api.on({
                'success': function success(data, json, xhr) {
                    var list = data || [];
                    emitter.fire('success', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取企业规模列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取企业规模列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post();
        }

    };
});