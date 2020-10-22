/*
* babel time: 2020-10-19 16:41:37
*
* source md5: B9E05E9B63F0CDB7C9477C0D2B52BB06
*
* source file: htdocs/views/master/application/list/Application/dialog/bind/Bind/confirm/Confirm/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Bind/Confirm/Footer', function (require, module, panel) {

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