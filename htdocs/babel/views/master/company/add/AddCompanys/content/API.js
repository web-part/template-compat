/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 35896888013F36A88E2B1DAD29051A19
*
* source file: htdocs/views/master/company/add/AddCompanys/content/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AddCompanys/Content/API', function (require, module, exports) {
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

        get: function get(opt, list) {

            var api = new API('web/org/org_list', {
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
                    var list = data.map(function (item) {

                        return {
                            'tid': item.tid,
                            'name': item.name,
                            'num': item.use_prod_num,
                            'phone': item.admin_mobile,
                            'status': item.org_status,
                            'creatName': item.admin_name,
                            'ifChecked': item.is_show ? true : false
                        };
                    });
                    emitter.fire('success', [list]);
                },

                'fail': function fail(code, msg, json) {

                    KISP.alert('获取企业列表失败: {0}', msg, function () {
                        emitter.fire('fail', 'post');
                    });
                },

                'error': function error() {
                    KISP.alert('获取企业列表失败错误: 网络繁忙，请稍候再试');
                }
            });
            api.post({});
        }
    };
});