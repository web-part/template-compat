/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 66AEB93537FA897E28587B8C1FCD18FC
*
* source file: htdocs/views/master/product/list/Products/dialog/active/Active/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Active/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$.on('click', 'button', function () {

            panel.fire('submit');
        });
    });

    panel.on('render', function () {});
});