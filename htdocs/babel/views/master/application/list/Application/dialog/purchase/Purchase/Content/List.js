/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 5CDF7BDAD0985CC64ECD82044B07B925
*
* source file: htdocs/views/master/application/list/Application/dialog/purchase/Purchase/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Purchase/Content/List', function (require, module, panel) {

    var KISP = require('KISP');
    var $Date = KISP.require('Date');

    var User = require('User');

    var list = [];
    var selects = null;
    var Info;

    panel.on('init', function () {
        //产品到期时间小于30天时标红显示。
        function getExpiredClass(date) {
            if (!date || date == '0000-00-00') {
                return '';
            }

            date = $Date.parse(date);

            var now = Date.now();
            var dd = date - now;

            //已过期。
            if (dd < 0) {
                return 'warning';
            }

            dd = dd / (24 * 3600 * 1000);
            dd = Math.floor(dd);

            //即将过期。
            if (dd < 30) {
                return 'notice';
            }

            return '';
        }

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
                    return {
                        'index': index,
                        'num': item.num,
                        'date': item.date || '',
                        'sn': item.sn,
                        'expire-class': getExpiredClass(item.date)
                    };
                }
            }
        });
    });
    panel.on('init', function () {});

    panel.on('render', function (items) {
        selects = new Set();

        list = items;

        panel.fill({
            'items': list
        });
    });
    return {};
});