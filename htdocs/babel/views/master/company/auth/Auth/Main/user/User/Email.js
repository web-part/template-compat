/*
* babel time: 2020-10-19 16:41:38
*
* source md5: E12415A035792D61B0CDC6F8BA778198
*
* source file: htdocs/views/master/company/auth/Auth/Main/user/User/Email.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 手机验邮箱。
*/
KISP.panel('/Auth/Main/User/Email', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;
    var regexp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close'
        });

        panel.$on('blur', {
            'input': function input() {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写邮箱');
                    return;
                }

                if (!regexp.test(value)) {
                    toast.show('邮箱非法');
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
                    toast.show('请填写邮箱');

                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('邮箱非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;
        }
    };
});