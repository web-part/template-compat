/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 71CECCB3776629DA33DDCED37BB358AF
*
* source file: htdocs/views/reset/Reset/Indicator.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 重置密码。
*/
KISP.panel('/Reset/Indicator', function (require, module, panel) {

    panel.on('init', function () {});

    panel.on('render', function (step) {

        panel.$.find('[data-step]').removeClass('on');
        panel.$.find('[data-step="' + step + '"]').addClass('on');
    });
});