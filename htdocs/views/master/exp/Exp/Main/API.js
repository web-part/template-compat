﻿
define('/Exp/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var MD5 = KISP.require('MD5');

    var emitter = new Emitter();
    var loading = null;
    var toast = null;




    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取产品账套列表。
        */
        get: function () {

            var api = new API('service/kiswebapp/web_prod_acctinfo', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading = loading || KISP.create('Loading', {
                        mask: 0,
                    });

                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    var list = data.orgdata || [];
                    emitter.fire('get', 'list', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                type: '1',
            });

        },

        /**
        * 获取产品连接信息。
        */
        getUrl: function (opt) {
            var api = new API('service/kiswebapp/web_prod_conninfo');

            api.on({
                'request': function () {
                    loading = loading || KISP.create('Loading', {
                        mask: 0,
                    });

                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    emitter.fire('get', 'url', [data.url]);

                },

                'fail': function (code, msg, json) {
                    if (code == '2010' || code == '2011') {
                        KISP.alert(msg, function () {
                            emitter.fire('get', 'url', [json.data.url]);
                        });
                    }
                    else {
                        KISP.alert('获取产品连接信息失败: {0}', msg);
                    }
                },

                'error': function () {
                    KISP.alert('获取产品连接信息错误: 网络繁忙，请稍候再试');
                },
            });

            api.post(opt);



        },

        /**
        * 校验KIS云插件状态。
        */

        checkBrowser: function (opt) {
            var api = new API('service/kiswebapp/web_check_kisyunplug_status', {
                //proxy: true,
            });


            api.on({
                'request': function () {
                    loading.show('启动中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('has-check', [opt]);
                },

                'fail': function (code, msg, json) {
                    KISP.alert('启动失败:{0}', msg);
                },

                'error': function () {
                    KISP.alert('启动错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'browserid': opt,
            });
        },

    };


});