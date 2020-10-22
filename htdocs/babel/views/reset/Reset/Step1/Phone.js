/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 04AB197E5DF978444BB3BB66588938E3
*
* source file: htdocs/views/reset/Reset/Step1/Phone.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Reset/Step1/Phone', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close'
        });

        var regexp = /^1\d{10}$/;

        panel.$on('blur', {
            'input': function input() {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    return;
                }

                if (regexp.test(value)) {
                    return;
                }

                toast.show('手机号非法!', function () {
                    //txt.focus();
                });
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

    /**
    * 
    *   //可选，第三方包。
    *   third = {
    *       phone: '',  //可选，要填充的手机号。 如果指定此值，则填充到输入框，并设置为只读。
    *   };
    */
    panel.on('render', function (third) {
        var value = third ? third.phone : '';

        panel.fill({
            'value': value || '',
            'readonly': value ? 'readonly' : '',
            'title': value ? '预设手机号，不允许修改。' : ''
        });

        if (value) {
            panel.fire('change', [true, value]);
        }
    });
});