/*
* babel time: 2020-10-19 16:42:31
*
* source md5: DCEE2FBC1AF30F306A874C411B1F3500
*
* source file: htdocs/lib/plugin/AccountPlugin/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('AccountPlugin/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var MD5 = KISP.require('MD5');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取产品连接信息。
        *   opt = {
        *       tid: '',        //必选，企业 id。
        *       acctid: '',     //必选，账套 id。
        *   };
        */
        getUrl: function getUrl(opt, done) {
            var api = new API('service/kiswebapp/web_prod_conninfo', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('获取连接...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {

                    done(data);
                },

                'fail': function fail(code, msg, json) {

                    //`2010` 产品已过期，警告提醒，不终止使用
                    if (code == '2010' || code == '2011') {
                        KISP.alert(msg, function () {
                            done(json.data);
                        });
                    } else {
                        KISP.alert('获取产品连接信息失败: {0}', msg);
                    }
                },

                'error': function error() {
                    KISP.alert('获取产品连接信息错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt['tid'],
                'acctid': opt['acctid']
            });
        },

        /**
        * 校验 KIS 云插件状态。
        *   id: '',  //必选，前端生成的随机 id，用于区分每个浏览器的每次点击行为。
        */
        check: function check(id) {
            var api = new API('service/kiswebapp/web_check_kisyunplug_status', {
                proxy: true
            });

            api.on({
                'request': function request() {
                    loading.show('启动中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    //不需要做什么。
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('启动失败:{0}', msg);
                },

                'error': function error() {
                    KISP.alert('启动错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'browserid': id
            });
        }

    };
});