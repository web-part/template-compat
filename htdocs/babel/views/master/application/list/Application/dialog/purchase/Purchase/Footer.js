/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 29ABEDDBB401116843443B7ED82A8026
*
* source file: htdocs/views/master/application/list/Application/dialog/purchase/Purchase/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Purchase/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            }

        });
    });

    panel.on('render', function () {});
});