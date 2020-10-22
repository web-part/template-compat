/*
* babel time: 2020-10-19 16:41:38
*
* source md5: BAAC81D6DA9872BA541D6DA9087B0715
*
* source file: htdocs/views/master/product/list/Products/Main/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Main/List', function (require, module, panel) {
    var KISP = require('KISP');
    var User = require('User');
    var Expired = module.require('Expired');
    var Delete = module.require('Delete');

    var list = [];

    var meta = {
        hide: false,
        env: KISP.data('env') //这个临时用的。 用来屏蔽掉体验环境里的 kis-o2o 入口。
    };

    panel.on('init', function () {
        var status$item = {
            0: { text: '未使用' },
            1: { text: '使用中' },
            2: { text: '已过期', class: 'warning' },
            3: { text: '超出空间大小' }
        };

        var model$text = {
            0: { text: '' }, //未确认模式
            1: { text: '公有云' },
            2: { text: '私有云' }
        };

        function displayO2O(sw) {
            var name = meta.env.name;
            var isEnvOK = name == 'test' || name == 'official';
            return isEnvOK && sw ? 'inherit' : 'none';
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

                'row': {
                    '': function _(item, index) {
                        var status = item.status;
                        var model = item.model;
                        var type = item.type; //产品类型，1 为已激活（已购正式版），2为未激活（赠送正式版）。

                        var modelText = model$text[model] || { text: '(未定义)' };
                        var statusItem = status$item[status] || { text: '(未定义)' };

                        var buttonDelete = this.fill('delete', item, index);

                        if (status == 1) {
                            statusItem = {
                                'text': model == 0 && type == 2 ? '试用中' : modelText.text + statusItem.text
                            };
                        }

                        return {
                            'index': index,
                            'name': item.name,
                            'count1': item.count1,
                            'count2': item.count2,
                            'users': item.users,
                            'size': item.size,
                            'usedSize': item.usedSize,
                            'expire': item.expire,

                            // 'area': item.area,                               //需求要求隐藏
                            //'create-class': allowCreate ? '' : 'hide',

                            'status': statusItem.text,
                            'actived-class': item.actived ? 'actived-true' : 'actived-false',

                            //私有云使用中时屏蔽所有功能
                            'gray': model == 2 && status == 1 ? 'gray' : '',

                            //公有云、私有云按钮显示
                            'owner': model == 1 && type != 2 ? 'has' : '',

                            //应用列表。 `未使用` 时灰禁用。
                            'app-list-disalbed': status == 0 || statusItem == '使用中' || statusItem == '私有云使用中' ? 'disabled' : '',

                            'if-free': function () {
                                if (status == 0) {
                                    return 'free-button';
                                }

                                if (model == 0 && status == 1 && type == 1) {
                                    return 'pub';
                                }

                                return '';
                            }(),

                            'expire-class': Expired.getClass(item.expire),
                            'status-class': statusItem.class || '',
                            'button-delete': buttonDelete,

                            'hide': meta.hide ? 'hide' : '',

                            //以下仅针对特定环境开放。
                            'kis-o2o-1-display': displayO2O(type == 2), //未激活的，显示 `新购`。
                            'kis-o2o-2-display': displayO2O(type == 1), //已激活的，显示 `加站加模`。
                            'kis-o2o-3-display': displayO2O(type == 1) //已激活的，显示 `续费`。

                        };
                    },

                    //删除按钮。
                    'delete': function _delete(item, index) {
                        //判断是否允许删除。
                        var valid = Delete.check(item);

                        if (!valid) {
                            return '';
                        }

                        return {
                            'index': index
                        };
                    }
                }
            }
        });
    });

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var index = +this.getAttribute('data-index');
            var item = list[index];
            var cmd = this.getAttribute('data-cmd');
            var status = item.status;
            var model = item.model;

            panel.$.find('[data-type="0"]').removeClass('on'); //去除新手指引

            if (model == 2 && status == 1 || cmd == 'app-list' && status == 0) {
                return;
            }

            panel.fire('cmd', cmd, [item]);
            panel.fire('cmd', [cmd, item]);
        });

        panel.$on('click', '[data-cmd="{value}"]', {
            //编辑。
            'edit': function edit(event) {
                var index = +this.getAttribute('data-index');
                var selector = '[data-edit="' + index + '"]';
                var $td = panel.$.find(selector);
                var item = list[index];

                $td.toggleClass('editbar');

                if ($td.hasClass('editbar')) {
                    panel.$.find(selector + ' input').val(item.name);
                    return;
                }

                var value = panel.$.find(selector + ' input').val();

                if (item['name'] == value) {
                    return;
                }

                panel.fire('save', [item, value]);
            },

            //kis-o2o
            'kis-o2o': function kisO2o() {
                var index = +this.dataset['index'];
                var type = this.dataset['type'];
                var item = list[index];

                panel.fire('kis-o2o', [type, item]);
            }
        });
    });

    /**
    */
    panel.on('render', function (items, hide) {
        list = items;
        meta.hide = hide;

        panel.fill({
            'items': items
        });

        panel.$.toggleClass('no-data', !items.length);

        var userInfo = User.get();
        var item = list[0];
        var valid = userInfo && item && item.model == 2 && item.status == 1;

        //展示新手指引。
        panel.$.find('[data-type="0"]').toggleClass('on', !!valid);
    });
});