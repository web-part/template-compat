/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 9DCDCCF8BA8808E0CA74B4DC265C8D32
*
* source file: htdocs/modules/message/list/Messages/Main/Detail.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Messages/Main/Detail', function (require, module, panel) {

    panel.on('init', function () {});

    panel.on('render', function (data) {

        panel.fill({
            'title': data.title,
            'content': data.content,
            'team': data.team,
            'time': data.time
        });

        panel.$.toggleClass('personal', data.type == 2); //type 为 2 的，表示个人消息，隐藏一些字段。
    });

    return {};
});