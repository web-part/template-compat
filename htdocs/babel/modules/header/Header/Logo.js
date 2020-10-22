/*
* babel time: 2020-10-19 16:42:31
*
* source md5: F08815C4066CD2F2F1B01B5CAE85E0B8
*
* source file: htdocs/modules/header/Header/Logo.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Header/Logo', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd(event) {
                var cmd = this.getAttribute('data-cmd');
                panel.fire('cmd', [cmd]);
            }

        });
    });

    panel.on('render', function () {});
});