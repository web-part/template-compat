/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 9BA8303A03363926988431008CE9AD9B
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base/Address/More.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Main/Base/Address/More', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var toast = null;

    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 200
        });

        panel.$on('blur', {
            'input': function input() {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写企业地址');
                    return;
                }

                if (value.length < 5) {
                    toast.show('企业地址不能少于5个字符');
                    Flash.start(panel.$, 'warning');
                    return;
                }
            }

        });
    });

    panel.on('render', function () {
        panel.fill({});
    });

    return {
        get: function get() {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写企业地址');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (value.length < 5) {
                return function () {
                    toast.show('企业地址不能少于5个字符');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }
            return value;
        }
    };
});