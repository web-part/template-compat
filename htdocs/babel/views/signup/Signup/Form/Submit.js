/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F9A4257A7DC8EE8B7B8DC3A18D5C7B54
*
* source file: htdocs/views/signup/Signup/Form/Submit.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Signup/Form/Submit', function (require, module, panel) {

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

        var valid = form && form.phone && form.name && form.code && form.password && form.agreed;

        panel.fill({
            'disabled': valid ? '' : 'disabled'
        });
    });
});