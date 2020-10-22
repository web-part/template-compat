/*
* babel time: 2020-10-19 16:41:38
*
* source md5: FE89E8CDF18188F347F16D629D1DF572
*
* source file: htdocs/views/master/product/list/Products/dialog/trial/Trial/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Trial/Footer', function (require, module, panel) {

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