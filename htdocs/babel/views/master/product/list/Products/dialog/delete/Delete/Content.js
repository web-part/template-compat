/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 49A053820538B5C9432DF882C400EA84
*
* source file: htdocs/views/master/product/list/Products/dialog/delete/Delete/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Delete/Content', function (require, module, panel) {

    panel.on('init', function () {});

    panel.on('render', function (product) {

        panel.fill({
            'name': product.name
        });
    });
});