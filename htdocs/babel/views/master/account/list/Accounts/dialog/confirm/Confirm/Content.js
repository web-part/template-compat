/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 06D92653B129F3CCD6ACBF22DF771169
*
* source file: htdocs/views/master/account/list/Accounts/dialog/confirm/Confirm/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Accounts/Confirm/Content', function (require, module, panel) {

    panel.on('init', function () {});

    panel.on('render', function (data) {
        var bind$describe = {
            0: '\u4F60\u786E\u8BA4\u5220\u9664\u8D26\u5957\u3010' + data.name + '\u3011\u5417',
            1: '该账套已绑定纷享销客，删除账套将终止与纷享销客的同步服务，不允许再次绑定，请慎重操作！'
        };
        panel.fill({
            'describe': bind$describe[data.is_bind]
        });
    });
});