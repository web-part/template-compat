/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 336F003C29A256C429828E7C37974CEF
*
* source file: htdocs/modules/update/list/Updates/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Updates/Header', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        //关闭按钮。
        panel.$on('click', {
            '[data-cmd]': function dataCmd(event) {
                var cmd = this.getAttribute('data-cmd');

                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function () {});

    return {};
});