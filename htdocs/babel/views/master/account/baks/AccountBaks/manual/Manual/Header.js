/*
* babel time: 2020-10-19 16:41:37
*
* source md5: D0A755CEE4DD53BD18744D7EC5F3AF57
*
* source file: htdocs/views/master/account/baks/AccountBaks/manual/Manual/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header', function (require, module, panel) {

    var API = module.require('API');
    var Bar = module.require('Bar');
    var THeader = module.require('THeader');

    panel.on('init', function () {
        THeader.on({
            'check': function check(checked) {
                panel.fire('check', [checked]);
            },

            'delete': function _delete() {
                panel.fire('delete');
            }
        });

        API.on({
            'getpan': function getpan(data) {
                Bar.render(data);
            }
        });
    });

    panel.on('render', function (meta, list, count) {
        THeader.render(list, count);
        API.get(meta);
    });

    return {};
});