/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 6DA645A5EE9D3A1724F95843C6A7E762
*
* source file: htdocs/views/signup/Signup/Form/Phone.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Signup/Form/Phone', function (require, module, panel) {
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

    panel.on('render', function () {

        panel.fill({}); //清空上次留下的。
    });
});