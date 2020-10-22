/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 5319BE767E17F51C7F7CD7E1CA6FF0D4
*
* source file: htdocs/modules/account/create/AccountCreate/type4/Type4/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountCreate/Type4/Footer', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="create"]': function dataCmdCreate() {
                panel.fire('create');
            }
        });
    });

    panel.on('render', function () {});

    return {};
});