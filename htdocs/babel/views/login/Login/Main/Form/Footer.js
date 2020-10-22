/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 5878CC26BECA0CDD843833E43CB81E50
*
* source file: htdocs/views/login/Login/Main/Form/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Login/Main/Form/Footer', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd]': function dataCmd(event) {
                var cmd = this.dataset['cmd'];

                event.preventDefault();

                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function (third) {
        var type = third ? third.type : 0;
        var hide = type == 5 || type == 6; //这两种类型的，隐藏注册入口。


        panel.fill({
            'signup-display': hide ? 'display: none;' : ''
        });
    });

    return {};
});