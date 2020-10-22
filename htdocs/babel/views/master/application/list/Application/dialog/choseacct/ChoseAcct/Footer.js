/*
* babel time: 2020-10-19 16:41:37
*
* source md5: E1A8528A29DA960E3B3BE99822D74CF6
*
* source file: htdocs/views/master/application/list/Application/dialog/choseacct/ChoseAcct/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/ChoseAcct/Footer', function (require, module, panel) {

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