/*
* babel time: 2020-10-19 16:42:32
*
* source md5: D2FC048BE052375D8FCB4DAD55D1CF2E
*
* source file: htdocs/views/signup/Signup/Form/Name.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Signup/Form/Name', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 188
        });

        function checkValid(value) {
            var len = value.length;
            var reg = /[^\a-z\A-Z\u4E00-\u9FA5]/g;

            if (reg.test(value)) {
                toast.show('名字需为中文或英文字母');
                return false;
            }

            return true;
        }

        panel.$on('input', {
            'input': function input(event) {
                var value = this.value;
                var valid = checkValid(value);

                panel.fire('change', [valid, value]);
            }
        });
    });

    panel.on('render', function () {

        panel.fill({}); //清空上次留下的。
    });
});