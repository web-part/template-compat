/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 6BE5CD801199CF0F5E7F030ED2AF8207
*
* source file: htdocs/views/master/product/list/Products/dialog/detail/Detail/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Detail/Content', function (require, module, panel) {

    var API = module.require('API');

    panel.on('init', function () {
        panel.template({
            '': function _(data) {

                return {
                    'proNum': data['product_sn'],
                    'proName': data['product_name'],
                    'startTime': data['active_time'],
                    'endTime': data['expire_time'],
                    'num': data['account_num'],
                    'userNum': data['user_num'],
                    'hasMode': data['buy_models'],
                    'noMode': data['other_models'],
                    'tip': data['remark']
                };
            }
        });
    });

    panel.on('render', function (data) {

        panel.fill(data);
    });
});