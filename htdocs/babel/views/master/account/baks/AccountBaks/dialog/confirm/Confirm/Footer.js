/*
* babel time: 2020-10-19 16:41:37
*
* source md5: B1D85F6B123FB8AB6C9A5B8F389E3D63
*
* source file: htdocs/views/master/account/baks/AccountBaks/dialog/confirm/Confirm/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountBaks/Confirm/Footer', function (require, module, panel) {

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