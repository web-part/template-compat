/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 4B30BC6E73A4A83EC8AAFFB9C501149B
*
* source file: htdocs/views/company/bind/CompanyBind/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/CompanyBind/List', function (require, module, panel) {

    var list = [];
    var tabs = null;

    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            'container': panel.$,
            'selector': '>li',
            'activedClass': 'on'
        });

        tabs.template(function (item, index) {
            return {
                'index': index,
                'name': item['name']
            };
        });

        tabs.on({
            'change': function change(item, index) {
                panel.fire('change', [item]);
            }
        });
    });

    /**
    */
    panel.on('render', function (items) {
        list = items;

        tabs.render(list);
    });
});