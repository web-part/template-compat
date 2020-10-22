/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 7DA01BC3AF7F7B53D5DAAA2903DE5F8F
*
* source file: htdocs/views/master/application/list/Application/dialog/forbidden/Forbidden/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Forbidden/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
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
                        'tel': item.phone
                    };
                }
            }
        });
    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function dataCmdCheck() {
                var index = +this.getAttribute('data-index');
                list[index].chosed = !list[index].chosed;
                var checked = list[index].chosed;
                $(this).toggleClass('on', checked);
                var some = list.some(function (item) {
                    return !item.chosed;
                });

                panel.fire('allcheck', [!some]);
            }

        });
    });

    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': list
        });
    });
    return {
        get: function get() {
            var select = [];
            list.forEach(function (item) {
                if (item.chosed) {
                    select.push(item.origin.user_id);
                }
            });
            return select;
        },
        checkall: function checkall(checked) {
            list.forEach(function (item, index) {
                item.chosed = checked;
            });
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        }
    };
});