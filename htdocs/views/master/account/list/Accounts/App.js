
define('/Accounts/App', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var API = require('API');


    var loading = KISP.create('Loading', {
        mask: 0,
    });




    return {

        /**
        * 检测某个账套下是否有应用列表。
        * 参数：
        *   item: {},    //必选，选中的账套。 
        */
        check: function (item, fn) {

            var api = new API('service/kiswebapp/web_get_account_applist', {
                //proxy: 'get-app-list.js',
            });

            api.on({
                'request': function () {
                    loading.show('检测中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data['appData'] || [];
                    var hasData = list.length > 0;

                    fn && fn(hasData);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取账套的应用列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'acctid': item.origin['account_id'],
            });

        },




    };


});