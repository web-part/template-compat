/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 80F226DC7D0977A14691DD9A5B694913
*
* source file: htdocs/views/master/account/list/Accounts/dialog/delete/Delete/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Accounts/Delete/Footer', function (require, module, panel) {

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