/*
* babel time: 2020-10-19 16:41:38
*
* source md5: B4A3A3BC07E4D2872C694D93DDAF0A21
*
* source file: htdocs/views/master/product/list/Products/dialog/delete/Delete/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Delete/Footer', function (require, module, panel) {

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