/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 0A13F510671292EA44B3776A6F959BF3
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Code.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 企业名称。
*/
KISP.panel('/Auth/Main/Base/Code', function (require, module, panel) {

    var toast = null;

    panel.on('init', function () {});

    panel.on('render', function () {});

    return {
        get: function get() {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            return value;
        }
    };
});