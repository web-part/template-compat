/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 5A464AC52C692529FA36A2246F2FB2E5
*
* source file: htdocs/views/master/application/list/Application/dialog/purchase/Purchase/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Purchase/Content', function (require, module, panel) {

    var List = module.require('List');

    var meta = {
        list: [] //最终要显示的用户列表。
    };

    panel.on('init', function () {});

    panel.on('render', function (data, pageinfo) {
        List.render(data);
    });

    return {
        get: List.get
    };
});