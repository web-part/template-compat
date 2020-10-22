/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 1BC6FAE519D711AC88C9A7ECD4415693
*
* source file: htdocs/views/master/application/list/Application/dialog/forbidden/Forbidden/Content/Head.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Forbidden/Content/Head', function (require, module, panel) {

    var User = require('User');
    var checked = false;

    panel.on('init', function () {});
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function dataCmdCheck() {
                checked = !checked;
                $(this).toggleClass('on', checked);
                panel.fire('check-all', [checked]);
            }

        });
    });

    panel.on('render', function (updateInfo) {

        // panel.fill({
        //     'items': list,
        // });

    });
    return {
        checkall: function checkall(chosed) {
            checked = chosed;
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        }
    };
});