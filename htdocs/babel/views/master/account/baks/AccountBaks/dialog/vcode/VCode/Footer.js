/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 664683968C54A2A40916B8803391E247
*
* source file: htdocs/views/master/account/baks/AccountBaks/dialog/vcode/VCode/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountBaks/VCode/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            }

        });
    });

    panel.on('render', function (action) {
        panel.fill({
            'action': action
        });
    });
});