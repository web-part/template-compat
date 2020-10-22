/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 83CBB6D5E55FAC7B8B69F756439B7957
*
* source file: htdocs/views/master/account/user/AccountUsers/Main/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountUsers/Main/List', function (require, module, panel) {

    var User = require('User');

    var list = [];

    panel.on('init', function () {

        var status$item = {
            0: {
                text: '已禁用',
                class: 'warning',
                enabled: true,
                buttonText: '启用',
                buttonClass: 'primary'

            },
            1: {
                text: '已启用',
                class: 'default',
                enabled: false,
                buttonText: '禁用',
                buttonClass: 'warning'

            }
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

                'row': function row(item, index) {
                    var status = item.status;
                    var role = item.role;

                    var statusItem = status$item[status];

                    return {
                        'index': index,
                        'phone': item.phone,
                        'name': item.name,
                        'status': status,
                        'role-enabled': role == 1 ? 'on' : '',
                        'status-text': statusItem.text,
                        'status-text-class': statusItem.class,
                        'button-status-class': statusItem.buttonClass,
                        'button-status-text': statusItem.buttonText,
                        'button-status-enabled': statusItem.enabled,
                        'button-delete-enabled': statusItem.enabled,
                        'button-delete-class': statusItem.enabled ? 'delete' : 'no-delete',
                        'hideEdit': item.status === 0 ? 'hide' : ''
                    };
                }
            }
        });
    });

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd="edit"]', function () {
            var index = +this.getAttribute('data-index');
            var selector = '[data-edit="' + index + '"]';
            var $btn = panel.$.find(selector);
            var item = list[index];

            $btn.toggleClass('editbar');

            if ($btn.hasClass('editbar')) {
                panel.$.find(selector + ' input').val(item.name);
                return;
            }

            var value = panel.$.find(selector + ' input').val();
            if (item['name'] == value) {
                return;
            }

            panel.fire('save', [item, value]);
        });

        panel.$on('click', {

            '[data-action]': function dataAction(event) {
                var action = this.getAttribute('data-action');
                var enabled = this.getAttribute('data-enabled');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                enabled = enabled == 'true';

                panel.$.find('[data-type="0"]').removeClass('on');

                panel.fire('set', action, [enabled, item, index]);
            },

            '[data-cmd="role"]': function dataCmdRole() {
                var index = +this.getAttribute('data-index');
                var item = list[index];
                var enabled = item.role == 1;

                enabled = !enabled;

                panel.fire('set', 'role', [enabled, item, index]);
            }

        });
    });

    /**
    *   items = [
    *       {},
    *   ];
    */
    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': items
        });

        panel.$.toggleClass('no-data', !items.length);

        var userInfo = User.get();

        if (userInfo && items.length) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }

        panel.$.find('[data-type="0"]').removeClass('on');
    });

    return {
        setStatus: function setStatus(index, enabled) {
            var item = list[index];
            var status = enabled ? 1 : 0;

            //状态没变。
            if (status == item.status) {
                return;
            }

            item.status = status;

            var tpl = panel.template();
            var html = tpl.fill('table', 'row', item, index);
            var tr = 'tr[data-index="' + index + '"]';
            tr = panel.$.find(tr).get(0);

            try {
                //先尝试用标准的方式刷新表格指定的行。
                tr.outerHTML = html; //IE9 及以下，无法设置 tr.outerHTML，会抛异常。
            } catch (ex) {
                panel.render(list); //采用降级方式，刷新整个表格。
            }
        },

        setRole: function setRole(index, enabled) {
            var item = list[index];
            var role = enabled ? 1 : 2;

            //角色没变。
            if (role == item.role) {
                return;
            }

            item.role = role;

            var label = '[data-cmd="role"][data-index="' + index + '"]';
            panel.$.find(label).toggleClass('on', enabled);
        }
    };
});