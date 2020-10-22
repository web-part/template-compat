/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F33B38DB4732AF8F1632C1F73401A7B0
*
* source file: htdocs/views/reset/Reset/Step2/Next.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Reset/Step2/Next', function (require, module, panel) {

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

        var valid = form && form.password1 && form.password2 && form.password1 == form.password2;

        panel.fill({
            'disabled': valid ? '' : 'disabled'
        });
    });
});