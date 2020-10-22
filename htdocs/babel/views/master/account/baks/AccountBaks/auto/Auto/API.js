/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 828FE112FD68A1999964191E7B1FEB34
*
* source file: htdocs/views/master/account/baks/AccountBaks/auto/Auto/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountBaks/Auto/API', function (require, module, exports) {
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

        /**
        * 获取公有云账套备份列表。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *   };
        */
        get: function get(opt) {

            var api = new API('web/product/get_account_auto_back_up_list', {
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

                    var list = data || [];

                    list = list.map(function (item) {
                        return {
                            'name': item['name'], //账套名字
                            // 'number': item['account_num'],      //账套号。
                            'size': item['size'], //账套大小，单位M
                            'datetime': item['create_time'], //备份时间
                            'status': item['status'], //备份状态，0为正在备份，1为备份完成，2备份异常，备份失败
                            'type': item['type'], //备份类型：1为自动备份，2为人工备份 
                            // 'remark': item['remark'],           //备份失败原因 
                            'sqlVersion': item['sql_version'], //数据库版本。
                            // 'checked': false,                   //用于多选里的批量操作。
                            'origin': item
                        };
                    });

                    ////test only-------------------------------
                    //var item = list[0];
                    //if (item) {
                    //    item = JSON.stringify(list[0]);
                    //    list = [
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //       JSON.parse(item),
                    //    ];
                    //}


                    emitter.fire('success', 'get', [list]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取公有云账套备份列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function error() {
                    KISP.alert('获取公有云账套备份列表错误: 网络繁忙，请稍候再试');
                }
            });

            api.post({
                'tid': opt.company.origin['tid'], //企业 id。
                'pid': opt.product.origin['pid'] //产品实例ID。
            });
        }

    };
});