
define('/Products/Trial/API', function (require, module, exports) {
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
        * 免费试用。
        */

        post: function (product) {
            var api = new API('web/product/try_product', {
                proxy: true,
            });

            api.on({
                'request': function () {
                    loading.show('试用提交中...');
                },

                'response': function () {
                    loading.hide();
                },

                'success': function (data, json, xhr) {
                    emitter.fire('success', [json.msg]);
                },

                'fail': function (code, msg, json) {
                    if (code == '405') {
                        emitter.fire('certify',[msg]);
                        return;
                    }

                    KISP.alert('免费试用失败: {0}', msg);
                    emitter.fire('fail');
                },


                'error': function () {
                    KISP.alert('免费试用错误: 网络繁忙，请稍候再试');
                },
            });


            product = product.origin;

            api.post({
                'tid': product['tid'],
                'prod_id': product['prod_id'],
            });

        },





    };


});