/*
* babel time: 2020-10-19 16:41:38
*
* source md5: B40AE0C4AF1572AA039A25EA7DC1BCDF
*
* source file: htdocs/views/master/product/list/Products/dialog/detail/Detail/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Detail/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$.on('click', 'button', function () {

            panel.fire('ok');
        });
    });

    panel.on('render', function () {});
});