/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 50378ECFDAE153626F0FF47CE23A0261
*
* source file: htdocs/views/master/application/list/Application/dialog/confirm/Confirm/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Confirm/Footer', function (require, module, panel) {

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