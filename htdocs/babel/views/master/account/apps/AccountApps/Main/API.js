/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 15C47C6C352C00CF02BAFED4B17B0DFC
*
* source file: htdocs/views/master/account/apps/AccountApps/Main/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define('/AccountApps/Main/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var $Object = KISP.require('Object');
    var API = require('API');

    var emitter = KISP.create('Emitter');

    var loading = KISP.create('Loading', {
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取某个账套下的应用列表。
        * 参数：
        *   account: {},    //必选，选中的账套。 后台原始的信息。
        */
        get: function get(account) {

            var api = new API('service/kiswebapp/web_get_account_applist', {
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
                    //账套信息。
                    var account = {
                        'name': data['acctName'],
                        'origin': data
                    };

                    //账套所属的产品信息。
                    var product = {
                        'type': 'product',
                        'name': data['srcProductName'],
                        'time': data['prodExpireDatetime'].split(' ')[0],
                        'company': data['name'] || '',
                        'icon': data['prodtag'],
                        'origin': data
                    };

                    //账套所属的产品下的应用列表。
                    var apps = data['appData'].map(function (item) {
                        return {
                            'type': 'app',
                            'name': item['appName'],
                            'time': item['appExpireTime'].split(' ')[0],
                            'icon': item['prodtag'],
                            'account': account, //关联多一个。 用于获取应用地址。
                            'product': product, //关联多一个。 用于获取应用地址。
                            'origin': item
                        };
                    });

                    //总的要填充的列表，产品固定为第一项。
                    var list = [product].concat(_toConsumableArray(apps));

                    emitter.fire('get', 'list', [account, list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取账套的应用列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取账套的应用列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'acctid': account['account_id']
            });
        },

        /**
        * 获取打开应用所需要的动态地址。
        */
        getUrl: function getUrl(item) {

            var api = new API('service/kiswebapp/web_sso_auth_login', {
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

                    var url = data['redirect_url'];

                    emitter.fire('get', 'url', [url]);
                },

                'fail': function fail(code, msg, json) {
                    //`2010` 产品已过期，警告提醒，不终止使用。
                    if (code == '2010' || code == '2011') {
                        KISP.alert(msg, function () {
                            var url = json.data['redirect_url'];
                            emitter.fire('get', 'url', [url]);
                        });
                    } else {
                        KISP.alert('获取应用的连接地址失败: {0}', msg);
                    }
                },

                'error': function error() {
                    KISP.alert('获取应用的连接地址错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'acctid': item.account.origin['acctid'],
                'icrmid': item.origin['icrmid']
            });
        }

    };
});