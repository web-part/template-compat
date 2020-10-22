/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 7618ED22A9B50AF78850DAF5D7DF4D54
*
* source file: htdocs/views/master/application/list/Application/dialog/forbidden/Forbidden/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Forbidden/Footer', function (require, module, panel) {

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