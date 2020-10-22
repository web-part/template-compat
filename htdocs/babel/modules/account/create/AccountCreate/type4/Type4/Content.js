/*
* babel time: 2020-10-19 16:42:31
*
* source md5: ECC55906E0E56DBE9A05E7EF9280F789
*
* source file: htdocs/modules/account/create/AccountCreate/type4/Type4/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountCreate/Type4/Content', function (require, module, panel) {

    var Form = module.require('Form');
    var Store = module.require('Store');

    panel.on('init', function () {});

    panel.on('render', function (data) {
        Form.render(data);
        Store.render();
    });

    return {
        /**
        * 获取用于提交给后台的数据。
        */
        get: function get() {

            var data = {};

            var modules = [Form, Store];

            //依次去获取对应的值，如果有非法的，则提前返回。

            var M = modules.find(function (M) {
                var item = M.get();

                if (!item) {
                    return true;
                }

                Object.assign(data, item);
            });

            //M 非空，说明它返回的值就是非法的。
            return M ? null : data;
        }
    };
});