/*
* babel time: 2020-10-19 16:41:37
*
* source md5: F9163B4CF1BAE39F642A4B64B92E5F46
*
* source file: htdocs/views/master/account/baks/AccountBaks/manual/Manual/Header/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountBaks/Manual/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        get: function get(opt) {

            var api = new API('web/user/get_pan_kingdee_info', {
                'proxy': true
            });

            api.on({
                'request': function request() {
                    loading.show('获取中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    emitter.fire('getpan', [{
                        'used': data.used,
                        'total': data.total,
                        'rate': data.used_per
                    }]);
                },

                'fail': function fail(code, msg, json) {
                    emitter.fire('getpan');
                },

                'error': function error() {
                    emitter.fire('getpan');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'] //企业 id。
            });
        }

    };
});