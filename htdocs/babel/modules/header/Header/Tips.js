/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 83C3FDD987CBEDBD1D4A8D60F4D94BB3
*
* source file: htdocs/modules/header/Header/Tips.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Header/Tips', function (require, module, panel) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');

    panel.on('init', function () {});

    panel.on('render', function (env) {
        var isTime = new Date() - $Date.parse('2019-02-28 23:59:59') <= 0;
        var name = env.name;

        panel.fill({
            'public-tips': name == 'public' ? 'on' : '',
            'official-tips': name == 'official' && isTime ? 'on' : ''
        });
    });
});