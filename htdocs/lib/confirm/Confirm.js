
define('Confirm', function (require, module, exports) {


    var Dialog = require('Dialog');
    var dialog = new Dialog({
        title: '你好',
        content: '你确认删除金蝶KISCloud商贸吗',
        height: 180,
        width: 400,

        footer: {
            buttons: [
                { text: '确定', cssClass: 'warnging', },
            ],
        },
    });

    dialog.render();

});