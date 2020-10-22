/*
* babel time: 2020-10-19 16:41:38
*
* source md5: A5AB4F6A57E86327DC990180B57444E3
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type2/Type2/Name.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 负责人姓名。
*/
KISP.panel('/Auth/Main/Auth/License/Type2/Name', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;

    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150
        });

        panel.$on('blur', {
            'input': function input() {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写负责人姓名');
                    return;
                }
            }

        });
    });

    panel.on('render', function () {
        panel.fill({});
    });

    return {
        reset: function reset() {
            panel.fill({});
        },

        get: function get() {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (value) {
                return value;
            }

            return function () {
                toast.show('请填写负责人姓名');
                txt.focus();
                Flash.start(panel.$, 'warning');
            };
        }
    };
});