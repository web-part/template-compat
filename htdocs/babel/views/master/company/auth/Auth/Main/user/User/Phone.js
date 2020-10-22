/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 9442B1BB65913B682A9DA6CDEF8822F9
*
* source file: htdocs/views/master/company/auth/Auth/Main/user/User/Phone.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 联系人手机。
*/
KISP.panel('/Auth/Main/User/Phone', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;
    var regexp = /^1\d{10}$/;

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
                    //toast.show('请填写手机号');
                    return;
                }

                if (value && !regexp.test(value)) {
                    toast.show('手机号非法');
                    Flash.start(panel.$, 'warning');
                    return;
                }
            }

        });

        panel.$on('input', {
            'input': function input(event) {
                var value = this.value;
                var valid = regexp.test(value);

                panel.fire('change', [valid, value]);
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
                    toast.show('请填写手机号');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('手机号非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;
        }
    };
});