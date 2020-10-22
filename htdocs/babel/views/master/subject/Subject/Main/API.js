/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 2831B11A8BDF39207C20CC6BC70A885B
*
* source file: htdocs/views/master/subject/Subject/Main/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define('/Subject/Main/API', function (require, module, exports) {
    var KISP = require('KISP');
    var API = require('API');

    var emitter = KISP.create('Emitter');

    var loading = KISP.create('Loading', {
        mask: 0
    });

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取产品账套列表。
        */
        get: function get() {

            var api = new API('service/kiswebapp/web_prod_acctinfo', {
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
                    var companys = data['orgdata'] || []; //企业列表。
                    var accounts = []; //账套列表。


                    //把企业的名称按字典排序，会影响当前数组本身。
                    companys.sort(function (a, b) {
                        return a.name > b.name ? 1 : -1;
                    });

                    companys = companys.map(function (company) {
                        //当前企业下的账套列表。
                        var accts = company['acctdata'] || [];

                        //按使用次数倒序。
                        accts.sort(function (a, b) {
                            return a['acctloginnum'] > b['acctloginnum'] ? -1 : 1;
                        });

                        accts = accts.map(function (account) {
                            return {
                                'isMax': false,
                                'account': account,
                                'company': company
                            };
                        });

                        //合并到总的账套列表。
                        accounts = [].concat(_toConsumableArray(accounts), _toConsumableArray(accts));

                        return {
                            'company': company,
                            'accounts': accts
                        };
                    });

                    //总的账套列表按使用次数倒序。
                    accounts.sort(function (a, b) {
                        return a.account['acctloginnum'] > b.account['acctloginnum'] ? -1 : 1;
                    });

                    //总列表里，第一项就是最大值的。
                    if (accounts[0]) {
                        accounts[0].isMax = true; //标识为最大值的。 同时会影响 companys 里面的那一项。 因为是同一个引用对象。
                    }

                    emitter.fire('get', 'list', [companys, accounts]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取账套列表失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取账套列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post();
        }

    };
});