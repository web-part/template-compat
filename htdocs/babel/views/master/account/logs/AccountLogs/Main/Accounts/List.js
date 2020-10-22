/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 36012691B57844FD9D9142C210D30CA2
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main/Accounts/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountLogs/Main/Accounts/List', function (require, module, panel) {

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
                    var phone = item.phone;
                    var user = item.user;
                    var verifier = phone;

                    if (user) {
                        verifier += '/' + user;
                    }

                    return Object.assign({}, item, {
                        'index': index,
                        'verifier': verifier
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