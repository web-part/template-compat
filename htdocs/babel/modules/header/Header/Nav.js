/*
* babel time: 2020-10-19 16:42:31
*
* source md5: F0A226E3C7A0C595E02627BF19B5AA47
*
* source file: htdocs/modules/header/Header/Nav.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Header/Nav', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd(event) {
                var cmd = this.getAttribute('data-cmd');

                panel.fire('cmd', [cmd]);
            }

        });
    });

    panel.on('render', function (count, env) {

        panel.fill({
            'help': env.data.help,
            'plugin': env.data.plugin,
            'try-icon': env.name == 'official' ? 'show' : '',
            'normal-icon': env.name == 'public' ? 'show' : '',

            'message-display': count > 0 ? '' : 'display: none;',
            'message-count': count > 99 ? '99+' : count

        });
    });
});