/*
* babel time: 2020-10-19 16:41:37
*
* source md5: D20EF98709AE494C44CB8DB3ECBE141E
*
* source file: htdocs/views/master/account/baks/AccountBaks/manual/Manual/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountBaks/Manual/List', function (require, module, panel) {
    var $ = require('$');
    var Remark = module.require('Remark');

    var list = [];

    panel.on('init', function () {
        var status$item = {
            0: { text: '正在备份', class: 'default' },
            1: { text: '备份完成', class: 'default' },
            2: { text: '备份失败', class: 'warning' },
            default: { text: '(未定义)', class: 'warning' }
        };

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

                'row': {
                    '': function _(item, index) {
                        var status = item.status;
                        var statusItem = status$item[status] || status$item['default'];
                        var refresh = this.fill('refresh', item, index);
                        var remark = Remark.process(item.remark);

                        return {
                            'index': index,
                            'name': item.name,
                            'size': item.size,
                            'datetime': item.datetime,
                            'status': status,
                            'status-text': statusItem.text,
                            'status-text-class': statusItem.class,
                            'sqlVersion': item.sqlVersion,
                            'remark': remark || '',
                            'download-class': status == 1 ? 'primary' : 'forbid', //只有备份成功的，才允许下载。
                            'delete-class': status == 0 ? 'forbid' : 'normal', //只有正在备份的，才禁止删除。
                            'refresh': refresh
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

                //如果给选中了，则交给批量操作，而行内的操作则禁用。
                var disabled = item.checked || $(this).hasClass('forbid') || list.some(function (item) {
                    return item.checked;
                });

                if (disabled) {
                    return;
                }

                panel.fire(cmd, [item, index]);
            },

            '[data-cmd="check"]': function dataCmdCheck() {
                var index = +this.getAttribute('data-index');
                var item = list[index];
                var checked = item.checked = !item.checked;

                //过滤出选中的项。
                var checks = list.filter(function (item) {
                    return !!item.checked;
                });

                var count = checks.length;

                $(this).toggleClass('on', checked);
                panel.$.toggleClass('checked', count > 0);

                panel.fire('check', [list, count]);
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
        panel.$.removeClass('checked'); //移除之前可能存在的，比如翻页重新填充后，需要移除上一页的选中状态。
    });

    return {
        checkAll: function checkAll(checked) {
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
            panel.$.toggleClass('checked', checked);

            list.forEach(function (item, index) {
                item.checked = checked;
            });
        },

        getChecks: function getChecks() {
            var items = list.filter(function (item, index) {
                return !!item.checked;
            });

            return items;
        }
    };
});