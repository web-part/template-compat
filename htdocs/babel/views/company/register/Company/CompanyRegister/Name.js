/*
* babel time: 2020-10-19 16:42:32
*
* source md5: FE3980157346224EEDF974F28C617614
*
* source file: htdocs/views/company/register/Company/CompanyRegister/Name.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/CompanyRegister/Name', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        function check(txt) {
            var value = txt.value;

            //实时去掉空格。
            if (value.includes(' ')) {
                value = txt.value = value.split(' ').join('');
            }

            return value || '';

            //var regexp = /[^\a-z\A-Z\u4E00-\u9FA5]/g;   //有数字不行。
            //var invalid = regexp.test(value);

            //return invalid ? '' : value;
        }

        panel.$bind('input', {
            'input': function input(event) {
                var value = check(this);

                panel.fire('change', [value]);
            }
        });
    });

    panel.on('render', function () {

        panel.fill({}); //清空上次留下的。
    });
});