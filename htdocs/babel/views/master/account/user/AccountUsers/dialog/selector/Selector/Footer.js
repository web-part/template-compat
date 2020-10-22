/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 129C2FA3DD49BB3D2388B244761A1C22
*
* source file: htdocs/views/master/account/user/AccountUsers/dialog/selector/Selector/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountUsers/Selector/Footer', function (require, module, panel) {

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