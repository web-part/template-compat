/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 54ED8A79621E23AD781C0C324D428FE9
*
* source file: htdocs/views/master/product/list/Products/dialog/active/Active/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Active/Content', function (require, module, panel) {
    var API = module.require('API');
    var Company = module.require('Company');
    var Sn = module.require('Sn');
    var Cdkey = module.require('Cdkey');

    panel.on('init', function () {});

    panel.on('render', function (data) {

        Company.render(data);
        Sn.render();
        Cdkey.render();
    });

    return {
        get: function get() {
            var sn = Sn.get();
            var cdkey = Cdkey.get();

            if (!sn || !cdkey) {
                return false;
            }

            return {
                'sn': sn,
                'cdkey': cdkey
            };
        }
    };
});