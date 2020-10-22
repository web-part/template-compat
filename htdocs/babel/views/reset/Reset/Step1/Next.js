/*
* babel time: 2020-10-19 16:42:32
*
* source md5: C46A74C52C6D9DF113786CCA50BD7B77
*
* source file: htdocs/views/reset/Reset/Step1/Next.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Reset/Step1/Next', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            'button': function button(event) {
                event.preventDefault();
                panel.fire('submit');
            }
        });
    });

    panel.on('render', function (form) {

        console.log(form);

        var valid = form && form.phone && form.code;

        panel.fill({
            'disabled': valid ? '' : 'disabled'
        });
    });
});