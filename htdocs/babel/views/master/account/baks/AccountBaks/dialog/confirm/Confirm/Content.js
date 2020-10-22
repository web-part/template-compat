/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 96ED6700B25EA2E476F9B29B04EF10CB
*
* source file: htdocs/views/master/account/baks/AccountBaks/dialog/confirm/Confirm/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountBaks/Confirm/Content', function (require, module, panel) {

    panel.on('init', function () {});

    panel.on('render', function (data) {

        panel.fill({
            'action': data.action,
            'name': data.name
        });
    });
});