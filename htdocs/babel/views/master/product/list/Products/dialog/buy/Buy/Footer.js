/*
* babel time: 2020-10-19 16:41:38
*
* source md5: D66BD4ECDC06A7AD4FCBAD67463E91F0
*
* source file: htdocs/views/master/product/list/Products/dialog/buy/Buy/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Buy/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.dataset['cmd'];

                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function () {});
});