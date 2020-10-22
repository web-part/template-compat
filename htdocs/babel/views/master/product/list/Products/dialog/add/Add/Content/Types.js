/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 9EAFC0499AB961B35C2E34835299501A
*
* source file: htdocs/views/master/product/list/Products/dialog/add/Add/Content/Types.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Add/Content/Types', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];
    var tabs = null;

    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>button:not(.forbid)',
            eventName: 'click',
            indexKey: 'data-index',
            activedClass: 'on'
        });

        tabs.on('change', function (item, index) {
            panel.fire('change', [item]);
        });
    });

    panel.on('render', function (items) {

        list = items;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'disabled': item.disabled ? 'forbid' : '',
                'title': item.title || ''
            };
        });

        tabs.active(0);
    });

    return {
        get: function get() {
            return {};
        }
    };
});