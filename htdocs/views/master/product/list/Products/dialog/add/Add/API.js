
define('/Products/Add/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');
    var Data = module.require('Data');

    var emitter = new Emitter();

    var loading = KISP.create('Loading', {
        mask: 0,
    });


    var toast = KISP.create('Toast', {
        duration: 1500,
        mask: 0,
    });



    return {
        'on': emitter.on.bind(emitter),

        /**
        * 获取产品列表和地区数据。
        */
        get: function (opt) {

            var api = new API('web/product/get_product_list', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    data = Data.format(data);

                    emitter.fire('success', 'get', [data]);

                },

                'fail': function (code, msg, json) {
                    KISP.alert('获取产品列表失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('获取产品列表错误: 网络繁忙，请稍候再试');
                },
            });


            api.post({
                'tid': opt.origin.tid
            });

        },

        /**
        * 创建产品。
        */
        post: function (opt) {
            var api = new API('web/product/add_order_product', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show();
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('添加成功', function () {
                        emitter.fire('success', 'post', [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('添加产品失败: {0}', msg);
                },

                'error': function () {
                    KISP.alert('添加产品错误: 网络繁忙，请稍候再试');
                },
            });


            var company = opt.company.origin;
            var type = opt.form.type.origin;
            var region = opt.form.region.origin;


            //var name = encodeURIComponent(type['product_name']);

            api.post({
                'tid': company['tid'],                  //用户企业 ID
                'icrm_id': type['icrm_id'],             //产品 icrm 中的 id。
                'prod_code': type['prod_code'],         //商品编码。
                'region_id': region['region_id'],        //产品选中的区域 ID
                //'product_name': name,                   //商品名称。
                'type': 2,                              //产品创建类型，1为正式版，2为试用版。
            });

        },


    };


});