/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 9ED9D20A442F33B2604287E20121FC4C
*
* source file: htdocs/views/master/account/list/Accounts/Main/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Accounts/Main/List', function (require, module, panel) {
    var KISP = require('KISP');
    var User = require('User');

    var list = [];

    var proStatus; //账套状态
    var status$item = {
        1: { text: '创建中', class: 'default' },
        2: { text: '已启用', class: 'default' },
        3: { text: '恢复失败', class: 'warning' },
        4: { text: '创建失败', class: 'warning' },
        5: { text: '已禁用', class: 'warning' },
        7: { text: '恢复中', class: 'default' },
        8: { text: '恢复中', class: 'default' },
        default: { text: '(未知)', class: 'warning' }
    };

    panel.on('init', function () {
        //账套状态，
        //1 为 web 系统 DB 创建成功，产品端账套创建中，
        //2 创建成功，正常，
        //3 不可以使用，异常状态  产品端恢复账套失败
        //4 不可以使用，异常状态，产品端创建账套失败
        //5 管理员禁用，禁用状态，不可使用
        function dealRemark(str) {
            var remark = '';
            var remarkNum = str.length / 24;
            if (str && str.length > 24) {
                for (var i = 0; i < remarkNum; i++) {
                    remark = remark + str.slice(i * 24, (i + 1) * 24) + '&#10;';
                }
                if (str.length % 24 > 0) {
                    remark = remark + str.slice(remarkNum * 24, str.length);
                }
            } else {
                remark = str;
            }
            return remark;
        }

        panel.template({
            '': function _(data) {
                var table = this.fill('table', data);
                var add = this.fill('add', data);

                return {
                    'table': table,
                    'add': add
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
                        var listClass = '';
                        var gray = '';
                        var remarkStatus = 'no-remark';
                        var remark = dealRemark(item.remark);
                        if (proStatus == 2) {
                            // 产品过期,不能禁用或者启用账套
                            listClass = 'has-some';
                        } else if (status == 1 || status == 7 || status == 8) {
                            gray = 'all-gray'; // 账套创建中和恢复中时不能进行任何操作
                        } else if (status == 3 || status == 4) {
                            gray = 'gray'; // 此状态下只能进行删除账套操作
                        } else if (status == 2) {
                            gray = 'no-delete'; //已启用状态时没有删除账套按钮
                        }

                        if (status == 3 || status == 4) {
                            remarkStatus = 'has-remark';
                        }
                        return {
                            'index': index,
                            'listClass': listClass,
                            'gray': gray,
                            'name': item.name,
                            'number': item.number,
                            'count1': item.count1,
                            'count2': item.count2,
                            'usedSize': item.usedSize,
                            'totalSize': item.totalSize,
                            'status': status,
                            'status-text': statusItem.text,
                            'remark': remark || '',
                            'remark-status': remarkStatus,
                            'status-text-class': statusItem.class,
                            'refresh': refresh
                        };
                    },

                    'refresh': function refresh(item, index) {
                        return item.status == 1 || item.status == 7 || item.status == 8 ? {
                            'index': index
                        } : '';
                    }
                }
            },

            //无数据时，显示一个大大的创建按钮。
            'add': function add(data) {
                return data.items.length ? '' : {};
            }
        });
    });

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var cmd = this.getAttribute('data-cmd');
            var index = +this.getAttribute('data-index');
            var item = list[index];
            var status = item.status;
            var ifCan = status != 2;

            panel.$.find('[data-type="0"]').removeClass('on');
            panel.$.find('[data-num="0"]').removeClass('on');

            switch (cmd) {
                case 'users':
                case 'open':
                    var statusDesc = proStatus == 2 ? '产品已过期' : '\u8D26\u5957' + status$item[status].text;
                    var todo = cmd == 'users' ? '添加用户' : '进入账套';

                    if (cmd == 'users' && proStatus == 2) {
                        KISP.alert(statusDesc + '\uFF0C\u4E0D\u80FD\u6DFB\u52A0\u7528\u6237');
                        return;
                    }

                    if (ifCan) {
                        KISP.alert(statusDesc + '\uFF0C\u4E0D\u80FD' + todo, function () {
                            if (status == 1 || status == 7 || status == 8) {
                                panel.fire('refresh', [item, index]);
                            }
                        });

                        return;
                    }

                    panel.fire(cmd, [item, index]);
                    break;

                case 'enable':
                    panel.fire('set-status', [item, index, true]);
                    break;

                case 'disable':
                    panel.fire('set-status', [item, index, false]);
                    break;

                case 'apps':
                    //只允许状态为 2 的账套进入应用列表。
                    if (status != 2) {
                        KISP.alert('当前账套不可用。');
                        return;
                    }

                default:
                    panel.fire(cmd, [item, index]);
                    break;
            };
        });

        panel.$.on('click', '[data-cmd="edit"]', function () {
            var index = +this.getAttribute('data-index');
            var btn = '[data-edit="' + index + '"]';
            var $btn = panel.$.find(btn);
            var item = list[index];

            $btn.toggleClass('editbar');

            if ($btn.hasClass('editbar')) {
                panel.$.find(btn + ' input').val(item.name);
                return;
            }

            var value = panel.$.find(btn + ' input').val();
            if (item['name'] == value) {
                return;
            }

            panel.fire('save', [item, value]);
        });

        panel.$.on('click', '[data-type="create-account"]', function () {
            panel.fire('create-account');
        });
    });

    /**
    */
    panel.on('render', function (items, status) {
        proStatus = status;
        list = items;

        panel.fill({
            'items': items
        });

        panel.$.toggleClass('no-data', !items.length);
        var userInfo = User.get();

        if (items.length && userInfo) {
            panel.$.find('[data-type="0"]').addClass('on');
            panel.$.find('[data-num="0"]').addClass('on');
        }

        if (!items.length && userInfo) {
            panel.$.find('[data-type="create-account"]').addClass('on');
        }
    });

    return {
        setStatus: function setStatus(index, enabled) {
            var item = list[index];
            var status = enabled ? 2 : 5; //已禁用为5

            //状态没变。
            if (status == item.status) {
                return;
            }

            item.status = status;

            var tpl = panel.template();
            var html = tpl.fill('table', 'row', item, index);
            var tr = 'tr[data-index="' + index + '"]';

            tr = panel.$.find(tr).get(0);
            tr.outerHTML = html;
        },

        /**
        * 更新自动备份状态。
        */
        setAutoBakStatus: function setAutoBakStatus(index, enabled) {
            var item = list[index];
            var value = enabled ? 1 : 0;

            //状态没变。
            if (value == item.origin['is_back_up']) {
                return;
            }

            item.origin['is_back_up'] = value;

            var label = '[data-cmd="auto-bak"][data-index="' + index + '"]';

            panel.$.find(label).toggleClass('on', enabled);
        }
    };
});