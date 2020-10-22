/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 4239124FB25D646D76A57858E621AE65
*
* source file: htdocs/modules/loading/Loading.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Loading', function (require, module, panel) {
    var KISP = require('KISP');
    var $String = KISP.require('String');

    panel.set('visible', true);

    panel.on('hide', function () {
        panel.fire('hide');
    });
});