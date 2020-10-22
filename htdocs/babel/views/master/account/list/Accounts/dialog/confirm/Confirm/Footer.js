/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 452BF80CE6B2C2DF9DA51C3F73009812
*
* source file: htdocs/views/master/account/list/Accounts/dialog/confirm/Confirm/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Accounts/Confirm/Footer', function (require, module, panel) {

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