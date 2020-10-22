/*
* babel time: 2020-10-19 16:41:38
*
* source md5: AB182D4D3A204857FF3E2463FE127739
*
* source file: htdocs/views/master/application/user/ApplicationUsers/dialog/selector/Selector/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/ApplicationUsers/Selector/Footer', function (require, module, panel) {

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