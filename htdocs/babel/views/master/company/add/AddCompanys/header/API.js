/*
* babel time: 2020-10-19 16:41:38
*
* source md5: F983D5F7F225DDFC0E7106BFC9D3BEFD
*
* source file: htdocs/views/master/company/add/AddCompanys/header/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AddCompanys/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        post: function post(list) {
            var api = new API('web/org/to_show', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show();
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    toast.show('添加成功', function () {
                        emitter.fire('success');
                    });
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('添加企业到常用企业列表中失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function error() {
                    KISP.alert('添加企业到常用企业列表中错误: 网络繁忙，请稍候再试');
                }
            });

            list = JSON.stringify(list);
            list = encodeURIComponent(list);
            api.post({
                tid: list
            });
        }
    };
});