/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 04FC582806679C81225E596AB53A31F9
*
* source file: htdocs/views/master/account/baks/AccountBaks/manual/Manual/Header/Bar.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header/Bar', function (require, module, panel) {

    var $ = require('$');

    panel.on('init', function () {});

    panel.on('render', function (data) {
        panel.fill({
            'used': data && data.used || '0.0G',
            'total': data && data.total || '0.0G'
        });

        panel.$.find('[data-cmd="bar-num"]').width(data.rate);
    });

    return {};
});