/*
* babel time: 2020-10-19 16:41:38
*
* source md5: F25ACDC43D3DFC0D84F837C97012917B
*
* source file: htdocs/views/master/product/list/Products/dialog/add/Add/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Add/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$.on('click', 'button', function () {

            panel.fire('submit');
        });
    });

    panel.on('render', function () {});
});