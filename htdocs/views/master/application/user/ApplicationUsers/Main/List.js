

KISP.panel('/ApplicationUsers/Main/List', function (require, module, panel) {

    var User = require('User');


    var list = [];



    panel.on('init', function () {

        var status$item = {
            0: {
                text: '已禁用',
                class: 'warning',
                enabled: true,
                buttonText: '启用',
                buttonClass: 'primary',

            },
            1: {
                text: '已启用',
                class: 'default',
                enabled: false,
                buttonText: '禁用',
                buttonClass: 'warning',

            },
        };





        panel.template({
            '': function (data) {
                var table = this.fill('table', data);

                return {
                    'table': table,
                };
            },

            'table': {
                '': function (data) {
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index) {
                    var status = item.status;

                    var statusItem = status$item[status];

                    return {
                        'index': index,
                        'phone': item.phone,
                        'name': item.name,
                        'status': status,
                        'status-text': statusItem.text,
                        'status-text-class': statusItem.class,
                        'button-status-class': statusItem.buttonClass,
                        'button-status-text': statusItem.buttonText,
                        'button-status-enabled': statusItem.enabled,
                        'button-delete-enabled': statusItem.enabled,
                        'button-delete-class': statusItem.enabled ? 'delete' : 'no-delete',
                        'hideEdit': item.status === 0 ? 'hide' : '',
                    };

                },
            },
        });
    });


    panel.on('init', function () {

        panel.$.on('click', '[data-cmd="edit"]', function () {
            var index = +this.getAttribute('data-index');
            var selector = `[data-edit="${index}"]`;
            var $btn = panel.$.find(selector);
            var item = list[index];

            $btn.toggleClass('editbar');

            if ($btn.hasClass('editbar')) {
                panel.$.find(`${selector} input`).val(item.name);
                return;
            }

            var value = panel.$.find(`${selector} input`).val();
            if (item['name'] == value) {
                return;
            }

            panel.fire('set', 'save', [item, value]);

        });

        panel.$on('click', {

            '[data-action]': function (event) {
                var action = this.getAttribute('data-action');
                var enabled = this.getAttribute('data-enabled');
                var index = +this.getAttribute('data-index');
                var item = list[index];

                enabled = enabled == 'true';

                panel.$.find('[data-type="0"]').removeClass('on');

                panel.fire('set', action, [enabled, item, index]);
            },

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
            'items': items,
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
        setStatus: function (index, enabled) {
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


            try { //先尝试用标准的方式刷新表格指定的行。
                tr.outerHTML = html; //IE9 及以下，无法设置 tr.outerHTML，会抛异常。
            }
            catch (ex) {
                panel.render(list); //采用降级方式，刷新整个表格。
            }


        },


        setRole: function (index, enabled) {
            var item = list[index];
            var role = enabled ? 1 : 2;

            //角色没变。
            if (role == item.role) {
                return;
            }


            item.role = role;

            var label = '[data-cmd="role"][data-index="' + index + '"]';
            panel.$.find(label).toggleClass('on', enabled);



        },
    };




});