/*
* babel time: 2020-10-19 16:41:37
*
* source md5: C1876A7FA6AB727AF9D9875137D0FB79
*
* source file: htdocs/views/master/application/list/Application/dialog/add/Add/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/Add/Content/List', function (require, module, panel) {

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
                        'detail': item.msg || '',
                        'chosed': item.chosed ? 'has-chosed' : ''
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

                if (list[index].chosed) {
                    return;
                }

                if (checked) {
                    selects.delete(list[index].origin.slv_icrm_id);
                } else {
                    selects.add(list[index].origin.slv_icrm_id);
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