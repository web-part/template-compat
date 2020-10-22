
define('/AccountBaks/Private/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    return {
        'on': emitter.on.bind(emitter),


        /**
        * 获取私有云账套备份列表。
        *   opt = {
        *       company: {},    //企业信息。
        *       product: {},    //产品信息。
        *   };
        */
        get: function (opt) {


            var api = new API('web/product/account_back_up_private', {
                'proxy': true,
            });

            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    var list = data || [];

                    list = list.map(function (item) {
                        return {
                            'name': item['back_name'],      //账套名字
                            'number': item['file_id'],      //账套号。
                            'size': item['size'],           //账套大小，单位M
                            'datetime': item['back_time'],  //备份时间
                            'checked': false,               //用于多选里的，批量操作。
                            'origin': item,
                        };
                    });

                    emitter.fire('success', 'get', [list]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取私有云账套备份列表失败: {0}(错误码: {1})', msg, code);
                },

                'error': function () {
                    KISP.alert('获取私有云账套备份列表错误: 网络繁忙，请稍候再试');
                },
            });

            api.post({
                'tid': opt.company.origin['tid'],           //企业 id。
                'prod_id': opt.product.origin['prod_id'],   //产品实例ID。
            });

        },

        getpan: function (opt) {


            var api = new API('web/user/get_pan_kingdee_info', {
                'proxy': true,
            });


            api.on({
                'request': function () {
                    loading.show('获取中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success','getpan', [{
                        'used': data.used,
                        'total': data.total,
                        'rate': data.used_per,
                    }]);

                },

                'fail': function (code, msg, json) {
                    emitter.fire('getpan');
                },

                'error': function () {
                    emitter.fire('getpan');
                },
            });


            api.post({
                'tid': opt.company.origin['tid'],   //企业 id。
            });

        },

    };


});