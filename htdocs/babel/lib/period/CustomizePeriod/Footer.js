/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 685C00DB9FDFE738DC2000CED475BAEC
*
* source file: htdocs/lib/period/CustomizePeriod/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('CustomizePeriod/Footer', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var cmd = this.getAttribute('data-cmd');
            panel.fire(cmd);
        });
    });

    panel.on('render', function (data) {});
});