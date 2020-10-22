/*
* babel time: 2020-10-19 16:41:38
*
* source md5: CC5AAD24C308072433BA08EB9557577E
*
* source file: htdocs/views/master/company/register/Register/Header.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Register/Header', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            }
        });
    });

    panel.on('render', function () {});
});