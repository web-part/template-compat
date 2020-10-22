/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 71D2CD2BF1192BC0265E93B69FD3A7B3
*
* source file: htdocs/lib/confirm/Confirm.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('Confirm', function (require, module, exports) {

    var Dialog = require('Dialog');
    var dialog = new Dialog({
        title: '你好',
        content: '你确认删除金蝶KISCloud商贸吗',
        height: 180,
        width: 400,

        footer: {
            buttons: [{ text: '确定', cssClass: 'warnging' }]
        }
    });

    dialog.render();
});