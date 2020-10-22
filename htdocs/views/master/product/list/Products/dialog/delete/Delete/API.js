
define('/Products/Delete/API', function (require, module, exports) {
    var $ = require('$');
    var KISP = require('KISP');
    var API = require('API');
    var Emitter = KISP.require('Emitter');

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
        * 删除产品。
        */
        post: function (opt) {
            var api = new API('web/product/del_order_product', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('删除中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {

                    toast.show('删除成功', function () {
                        emitter.fire('success',  [data]);
                    });

                },

                'fail': function (code, msg, json) {
                    KISP.alert('删除产品失败: {0}', msg);
                    emitter.fire('fail', []);
                    
                },

                'error': function () {
                    KISP.alert('删除产品错误: 网络繁忙，请稍候再试');
                },
            });


            var company = opt.company.origin;
            var product = opt.product.origin;

            api.post({
                'tid': company['tid'],                  //用户企业 ID
                'prod_id': product['prod_id'],         //产品ID。
            });

        },


    };


});