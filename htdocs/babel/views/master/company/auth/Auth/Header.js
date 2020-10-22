/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 4A023E712838C8EF04701F0C6BC38654
*
* source file: htdocs/views/master/company/auth/Auth/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Auth/Header', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function (company) {

        panel.fill({
            'company': company.name
        });
    });
});