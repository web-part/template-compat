/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 1FB6602F0036553EE1CA1826E10FAF40
*
* source file: htdocs/views/master/application/list/Application/dialog/add/Add/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Add/Footer', function (require, module, panel) {

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