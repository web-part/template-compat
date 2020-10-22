/*
* babel time: 2020-10-19 16:41:37
*
* source md5: F9BD4D2DCB670806A1BC311B292E56F7
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main/Baks/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountLogs/Main/Baks/List', function (require, module, panel) {

    var list = [];

    panel.on('init', function () {
        panel.template({
            '': function _(data) {
                var table = this.fill('table', data);

                return {
                    'table': table
                };
            },

            'table': {
                '': function _(data) {
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows
                    };
                },

                'row': function row(item, index) {

                    return Object.assign({}, item, {
                        'index': index

                    });
                }
            }
        });
    });

    /**
    */
    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': items
        });

        panel.$.toggleClass('no-data', !items.length);
    });
});