/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 42EF0CBC309BD4172914DCBB1F4E4F2D
*
* source file: htdocs/views/master/account/baks/AccountBaks/private/Private/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountBaks/Private/List', function (require, module, panel) {

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
                    var rows = this.fill('row', data.items, data.isPublic);

                    return {
                        'rows': rows
                    };
                },

                'row': {
                    '': function _(item, index, isPublic) {

                        return {
                            'index': index,
                            'name': item.name,
                            'size': item.size,
                            'datetime': item.datetime
                        };
                    },

                    'refresh': function refresh(item, index) {
                        return item.status == 0 ? {
                            'index': index
                        } : '';
                    }
                }
            }
        });
    });

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var cmd = this.getAttribute('data-cmd');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                //禁用的，禁止下载。
                if ($(this).hasClass('forbid')) {
                    return;
                }

                panel.fire(cmd, [item, index]);
            }

        });
    });

    /**
    *   items = [
    *       { },
    *   ];
    */
    panel.on('render', function (items) {
        list = items;

        panel.fill({
            'items': items
        });

        panel.$.toggleClass('no-data', !items.length);
    });

    return {};
});