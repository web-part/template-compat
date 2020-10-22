/*
* babel time: 2020-10-19 16:41:37
*
* source md5: A61EB08C4D206E329DE4216729DE6099
*
* source file: htdocs/views/master/application/list/Application/dialog/manage/Manage/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Manage/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var selects = null;
    var Info;

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
                    return {
                        'index': index,
                        'name': item.name,
                        'acctname': item.acctname,
                        'mobile': item.mobile || '',
                        'time': item.time
                    };
                }
            }
        });
    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function dataCmdCheck() {
                var index = +this.getAttribute('data-index');

                var checked = $(this).hasClass('on');

                if (checked) {
                    selects.delete(list[index].origin.prod_user_id);
                } else {
                    selects.add(list[index].origin.prod_user_id);
                }
                $(this).toggleClass('on', !checked);
                panel.$.find('[data-type="0"]').removeClass('on');
            }

        });
    });

    panel.on('render', function (items) {
        selects = new Set();

        list = items;

        panel.fill({
            'items': list
        });
    });
    return {
        get: function get() {
            return Array.from(selects);
        }
    };
});