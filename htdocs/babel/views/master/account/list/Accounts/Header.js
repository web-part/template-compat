/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 88AA889F0B7B82C1E519684788517B58
*
* source file: htdocs/views/master/account/list/Accounts/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Accounts/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var plugin = KISP.data('plugin');

    var User = require('User');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var forbidden = $(this).hasClass('forbid');
                if (forbidden) {
                    return;
                }

                var cmd = this.getAttribute('data-cmd');
                if (cmd == 'create-account') {
                    panel.$.find('[data-type="create-account"]').removeClass('on');
                }

                panel.fire(cmd);
            },

            '[data-type="delete-tip"]': function dataTypeDeleteTip() {
                panel.$.find('[data-type="download"]').removeClass('on');
            }
        });
    });

    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
            'plugin': plugin.url
        });
    });

    return {};
});