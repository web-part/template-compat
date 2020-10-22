/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 42BD5A0DD4640294BBD1EFD128D7961B
*
* source file: htdocs/modules/account/create/AccountCreate.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 创建账套对话框。
*/
KISP.panel('/AccountCreate', function (require, module, panel) {
    var API = module.require('API');
    var Type1 = module.require('Type1');
    var Type2 = module.require('Type2');
    var Type3 = module.require('Type3');
    var Type4 = module.require('Type4');

    var meta = {
        M: null, //Type1 或 Type3 或 Type2，
        company: null,
        product: null
    };

    var productId$type = {
        'S1S052S001': 1, //商贸版
        'S1S052S002': 2, //专业版
        'S1S052S003': 3, //旗舰版
        'S1S052S004': 4 //金管家
    };

    panel.on('init', function () {
        API.on('success', {
            //检测成功。
            'check': function check() {
                meta.M.render(meta);
            },

            //创建账套成功。
            'create': function create() {
                meta.M.close();
                panel.fire('success', [meta]);
            }
        });

        API.on('fail', {

            //创建账套失败。
            'create': function create() {
                meta.M.close();
                panel.fire('success', [meta]);
            }
        });

        [Type1, Type2, Type3, Type4].forEach(function (M) {
            M.on('submit', function (data) {
                API.create({
                    'company': meta.company,
                    'product': meta.product,
                    'data': data
                });
            });
        });
    });

    /**
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        var productId = data.product.origin['product_id'];
        var type = productId$type[productId];

        ////
        //var type = 1;

        meta = data;
        meta.M = module.require('Type' + type);

        API.check(data);
    });
});