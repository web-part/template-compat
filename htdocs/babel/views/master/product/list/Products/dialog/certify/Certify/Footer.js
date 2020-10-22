/*
* babel time: 2020-10-19 16:41:38
*
* source md5: D6F7D2A396175ED0ACAB3F7ACB4F6F1F
*
* source file: htdocs/views/master/product/list/Products/dialog/certify/Certify/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Certify/Footer', function (require, module, panel) {

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