/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 9E3F09273CE687D17407D329D8618702
*
* source file: htdocs/modules/account/recover/AccountRecover/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover/Footer', function (require, module, panel) {

    // var API = module.require('API');


    panel.on('init', function () {
        // API.on('success', {

        // });
        panel.$.on('click', '[data-cmd]', function () {
            var cmd = this.getAttribute('data-cmd');
            panel.fire(cmd);
        });
    });

    panel.on('render', function (data) {});
});