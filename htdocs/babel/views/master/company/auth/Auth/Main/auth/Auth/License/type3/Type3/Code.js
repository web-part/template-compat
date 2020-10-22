/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 5B7C5F50F31C2E59640529151311AA56
*
* source file: htdocs/views/master/company/auth/Auth/Main/auth/Auth/License/type3/Type3/Code.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 证件号码
*/
KISP.panel('/Auth/Main/Auth/License/Type3/Code', function (require, module, panel) {
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
                var len = value.length;

                if (!value) {
                    //toast.show('请填写证件号码');
                    return;
                }
            }

        });
    });

    panel.on('render', function () {});

    return {
        reset: function reset() {
            panel.fill({});
        },

        get: function get() {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;
            var len = value.length;

            if (!value) {
                return function () {
                    toast.show('请填写证件号码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;
        }

    };
});