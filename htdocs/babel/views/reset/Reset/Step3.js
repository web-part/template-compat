/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 38C85CAA20A96A54E6A21CC8C2B80183
*
* source file: htdocs/views/reset/Reset/Step3.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 重置密码。
*/
KISP.panel('/Reset/Step3', function (require, module, panel) {

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="login"]': function dataCmdLogin(event) {
                event.preventDefault();

                panel.$.removeClass('on');
                panel.fire('done', []);
            }
        });
    });

    /**
    * 
    */
    panel.on('render', function () {

        panel.$.addClass('on');

        panel.fire('render');
    });

    return {
        removeClass: function removeClass() {
            panel.$.removeClass('on');
        }
    };
});