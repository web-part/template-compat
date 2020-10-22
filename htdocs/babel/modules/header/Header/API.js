/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 373BCA72F24EC8E0AC2973F97CB3BB53
*
* source file: htdocs/modules/header/Header/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Header/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');

    var Emitter = KISP.require('Emitter');
    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    var defaults = KISP.data(module.id);

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取跳转到 kis-o2o 的【订单列表】链接。
        */
        getUrl: function getUrl() {

            var api = new API('web/kiso2o/login_by_kisyun', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('加载中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    var url = data.url;

                    emitter.fire('success', 'url', [url, defaults]);
                },

                'fail': function fail(code, msg, json) {

                    KISP.alert('获取跳转到 kis-o2o 的链接失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取跳转到 kis-o2o 的链接错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'type': 4, //后端已经增加一个新的type 4请求单点登录的时候会默认跳转我的订单页面。
                'test': defaults.test //为了区分跳到不同的环境。
            });
        }

    };
});