/*
* babel time: 2020-10-19 16:42:32
*
* source md5: A0E768039C6878CE48390FA86F9188DB
*
* source file: htdocs/views/login/Login/Main/Banner.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Login/Main/Banner', function (require, module, panel) {
    var KISP = require('KISP');
    var env = KISP.data('env');

    panel.on('init', function () {
        // panel.$on('click', {
        //     '[data-cmd]': function (event) {
        //         var cmd = this.getAttribute('data-cmd');
        //         debugger;
        //         panel.fire('cmd', [cmd]);
        //     },

        // });

    });

    panel.on('render', function () {
        panel.fill({
            'show': env.name == 'public' ? 'on' : '',
            'try-icon': env.name == 'official' ? 'on' : '',
            'normal-icon': env.name == 'public' ? 'on' : '',
            'help': env.data.help
        });
    });

    return {};
});