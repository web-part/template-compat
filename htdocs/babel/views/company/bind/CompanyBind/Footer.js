/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 68B49AF653CB2E4A2192DA8F374F9B1F
*
* source file: htdocs/views/company/bind/CompanyBind/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/CompanyBind/Footer', function (require, module, panel) {

    panel.on('init', function () {
        panel.template().fix('disabled');

        panel.$on('click', {
            '[data-cmd]': function dataCmd(event) {
                var cmd = this.getAttribute('data-cmd');
                event.preventDefault();

                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function (valid) {

        panel.fill({
            'disabled': valid ? '' : 'disabled'
        });
    });
});