/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 99FFA8C2AB50CE9B65ADBFB64B8DEF8E
*
* source file: htdocs/views/master/account/baks/AccountBaks/API.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountBaks/API', function (require, module, exports) {
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

    /**
    * 标准化 post 参数。
    *   opt = {
    *       company: {},    //必选，企业信息。
    *       item: {},       //必选，账套备份信息。
    *       form: {},       //可选，表单信息，如果有，则提供验证码。
    *   };
    */
    function normalize(opt) {
        var company = opt.company.origin;
        var item = opt.item.origin;
        var form = opt.form;

        var isPublic = !!item['back_id']; //是否为公有云。
        var key = isPublic ? 'back_id' : 'file_id'; //

        var params = {
            'tid': company['tid'], //企业 id。
            'code': form ? form.code : '', //可能需要短信验证码。
            'type': isPublic ? 1 : 2, //

            'back_id': item[key] //
        };

        return params;
    }

    /**
    * 删除一条账套备份记录。
    *   opt = {
    *       company: {},    //必选，企业信息。
    *       item: {},       //必选，账套备份信息。
    *       form: {},       //可选，表单信息，如果有，则提供验证码。
    *   };  
    */
    function deleteItem(opt) {

        var api = new API('web/product/del_back_up', {
            'proxy': true
        });

        api.on({
            'request': function request() {
                loading.show('删除中...');
            },

            'response': function response() {
                loading.hide();
            },

            'success': function success(data, json, xhr) {
                toast.show('删除成功', function () {
                    emitter.fire('success', 'delete', []);
                });
            },

            'fail': function fail(code, msg, json) {
                KISP.alert('删除账套备份失败: {0}', msg, code);
            },

            'error': function error() {
                KISP.alert('删除账套备份错误: 网络繁忙，请稍候再试');
            }
        });

        var params = normalize(opt);

        api.post(params);
    }

    /**
    * 批量删除多条账套备份记录。
    * 目前仅针对公有云。
    *   opt = {
    *       company: {},    //必选，企业信息。
    *       list: [],       //必选，选中的列表项，即多条账套备份信息。
    *       form: {},       //必选，验证码的表单信息，需要提供验证码。
    *   };
    */
    function deleteList(opt) {
        var api = new API('web/product/del_back_up_batch', {
            'proxy': true
        });

        api.on({
            'request': function request() {
                loading.show('批量删除中...');
            },

            'response': function response() {
                loading.hide();
            },

            'success': function success(data, json, xhr) {
                toast.show('批量删除成功', function () {
                    emitter.fire('success', 'delete', []);
                });
            },

            'fail': function fail(code, msg, json) {
                KISP.alert('批量删除账套备份失败: {0}', msg, code);
            },

            'error': function error() {
                KISP.alert('批量删除账套备份错误: 网络繁忙，请稍候再试');
            }
        });

        var ids = opt.list.map(function (item) {
            return item.origin['back_id'];
        });

        var params = {
            'tid': opt.company.origin['tid'], //企业 id。
            'code': opt.form.code, //需要短信验证码。
            'type': 1, //1 为公有云，2 为私有云。 【目前这里只针对公有云】。
            'back_id_list': ids.join(',') //批量删除的 back_id，使用 `,` 分开。
        };

        api.post(params);
    }

    return {
        'on': emitter.on.bind(emitter),

        /**
        * 删除一和或多条账套备份记录。
        */
        delete: function _delete(opt) {
            var item = opt.item;

            if (Array.isArray(item)) {
                deleteList({
                    'company': opt.company,
                    'list': item,
                    'form': opt.form
                });
            } else {
                deleteItem({
                    'company': opt.company,
                    'item': item,
                    'form': opt.form
                });
            }
        },

        /**
        * 获取一条账套备份记录的下载地址。
        */
        download: function download(opt) {

            var api = new API('web/product/get_back_up_down_url', {
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
                    var url = data['down_url'];

                    emitter.fire('success', 'download', [url]);
                },

                'fail': function fail(code, msg, json) {
                    KISP.alert('获取账套备份的下载地址失败: {0}', msg);
                },

                'error': function error() {
                    KISP.alert('获取账套备份的下载地址错误: 网络繁忙，请稍候再试');
                }
            });

            var params = normalize(opt);

            api.post(params);
        }

    };
});