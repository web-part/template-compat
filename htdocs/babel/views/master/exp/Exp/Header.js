/*
* babel time: 2020-10-19 16:42:32
*
* source md5: C7A57487328387A6764E7D182740E007
*
* source file: htdocs/views/master/exp/Exp/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Exp/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var plugin = KISP.data('plugin');

    var User = require('User');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            }
        });

        panel.$on('click', {
            '[data-type="delete-tip"]': function dataTypeDeleteTip() {
                panel.$.find('[data-type="download"]').removeClass('on');
            }
        });
    });

    panel.on('render', function () {

        panel.fill({
            'plugin': plugin.url
        });
    });

    return {
        // setList: function (list) { 
        //     if (list.length) { 
        //         panel.$.find('[data-type="download"]').removeClass('hide');
        //         return;
        //     }
        //     panel.$.find('[data-type="download"]').addClass('hide');
        // }
    };
});