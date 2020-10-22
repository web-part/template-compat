/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 9454AC93059B7EAB9A4BAF2DFF5702C8
*
* source file: htdocs/modules/account/recover/AccountRecover/Content/Tabs.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountRecover/Content/Tabs', function (require, module, panel) {

    var KISP = require('KISP');

    var tabs = null;

    panel.on('init', function () {

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '[data-index]',
            activedClass: 'on',
            eventName: 'click'
        });

        tabs.on('change', function (item, index) {
            panel.fire('change', [index]);
        });
    });

    panel.on('render', function (index) {

        tabs.render();
        tabs.active(index);
    });
    return {
        'reset': function reset() {
            tabs.reset();
        }
    };
});