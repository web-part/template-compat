/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 45D0E06532EAE6867DA0CDDFC28A8C2F
*
* source file: htdocs/views/master/account/list/Accounts/App.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Accounts/App', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var API = require('API');

    var loading = KISP.create('Loading', {
        mask: 0
    });

    return {

        /**
        * 检测某个账套下是否有应用列表。
        * 参数：
        *   item: {},    //必选，选中的账套。 
        */
        check: function check(item, fn) {

            var api = new API('service/kiswebapp/web_get_account_applist', {
                //proxy: 'get-app-list.js',
            });

            api.on({
                'request': function request() {
                    loading.show('检测中...');
                },

                'response': function response() {
                    loading.hide();
                },

                'success': function success(data, json, xhr) {
                    var list = data['appData'] || [];
                    var hasData = list.length > 0;

                    fn && fn(hasData);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取账套的应用列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'acctid': item.origin['account_id']
            });
        }

    };
});