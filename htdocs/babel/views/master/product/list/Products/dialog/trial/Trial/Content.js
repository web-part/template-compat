/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 22CF89F36639497C838C9395864F574D
*
* source file: htdocs/views/master/product/list/Products/dialog/trial/Trial/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Trial/Content', function (require, module, panel) {

    var status$text = {
        '0': '未认证',
        '3': '未通过审核（认证失败）'
    };

    panel.on('init', function () {});

    panel.on('render', function (status) {

        var text = status$text[status];

        panel.fill({
            'text': text
        });
    });
});