/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 9254DF8FC26B97C0089EBD61256E37FF
*
* source file: htdocs/views/company/register/Company/CompanyRegister/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/CompanyRegister/Footer', function (require, module, panel) {

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