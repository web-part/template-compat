/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 794BB8C0E16B96CB86201BE34B3C196D
*
* source file: htdocs/views/reset/Reset/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Reset/Footer', function (require, module, panel) {

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="login"]': function dataCmdLogin(event) {
                event.preventDefault();

                panel.fire('login', []);
            }
        });
    });

    /**
    * 
    *
    */
    panel.on('render', function () {});

    return {};
});