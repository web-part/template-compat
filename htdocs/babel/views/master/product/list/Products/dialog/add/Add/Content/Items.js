/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 67999CA496E1AFD79F6349EFD7DCBD83
*
* source file: htdocs/views/master/product/list/Products/dialog/add/Add/Content/Items.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Add/Content/Items', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];
    var tabs = null;

    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>button',
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
                'name': item.name
            };
        });

        //list 有可能为空数组。
        if (list.length > 0) {
            tabs.active(0);
        } else {
            panel.fire('change', [null]);
        }
    });
});