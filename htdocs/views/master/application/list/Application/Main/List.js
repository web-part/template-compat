

KISP.panel('/Application/Main/List', function (require, module, panel) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');
    var User = require('User');
    var getData = require('list.Index');
    var list = [];
    var product = {};

    panel.on('init', function () {
        var status$text = {
            0: { text: '未使用', },
            1: { text: '试用中', },
            2: { text: '使用中', },
            3: { text: '已过期', class: 'warning', },
            4: { text: '开通中', },
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

                'row': {
                    '': function (item, index) {
                        var noSelect = '';
                        var button = 'user-manage';
                        var style = '';
                        var droplist = getData({
                            itemlist: item,
                            productType: product.type,
                        }) || [];
                        var drop = this.fill('drop', droplist, index);
                        var refresh = this.fill('refresh', item, index);
                        if (!droplist.length) {  //此时没有下拉操作
                            noSelect = 'no-select'
                        }

                        if (item.status === 0) {
                            button = 'free-test';
                        } else {
                            if (item.tag === 'kisfxiaoke') {
                                button = 'bind-account';
                            }
                        }

                        if (item.status === 3 || item.status === 4) {
                            style = 'gray';  //已过期和开通中时button不可点击
                        }

                        return {
                            'index': index,
                            'name': item.name,
                            'type': item.tag,
                            'endtime': item.expire,
                            'users': item.users,
                            'status': status$text[item.status].text,
                            'button': button,
                            'style': style,
                            'drop': drop,
                            'refresh': refresh,
                            'no-select': noSelect,
                            'status-text-class': status$text[item.status].class,
                        };
                    },
                    'refresh': function (item, index) {
                        return (item.status === 4) ? {
                            'index': index,
                        } : '';
                    },
                    'drop': function (item, index, num) {
                        return {
                            'index': num,
                            'cmd': item.cmd,
                            'dropname': item.name,
                        };
                    },
                },
            },
        });
    });

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {

            var index = +this.getAttribute('data-index');
            var item = list[index];
            var cmd = this.getAttribute('data-cmd');
            var text = '该账套已绑定纷享销客，删除账套将终止与纷享销客的同步服务，不允许再次绑定，请慎重操作！';
            panel.$.find('[data-type="0"]').removeClass('on');   //去除新手指引

            if ((item.status == 3 && cmd == 'bind-account') || (item.status === 4 && cmd !== 'refresh') || (item.status == 3 && cmd == 'user-manage')) {
                return;
            }
            if (cmd === 'delete' && item.bind && item.tag === 'kisfxiaoke') {  //分享逍客删除时的处理
                KISP.alert(text, function () {
                    panel.fire('cmd', cmd, [item]);
                    panel.fire('cmd', [cmd, item]);
                });
                return;
            }

            panel.fire('cmd', cmd, [item]);
            panel.fire('cmd', [cmd, item]);

        });

    });



    /**
    */
    panel.on('render', function (items, productMs) {
        list = items;
        product = productMs;
        panel.fill({
            'items': items,
        });
        panel.$.find('[data-cmd="manage"]').hide();
        panel.$.find('[data-type="kisfxiaoke"][data-cmd="manage"]').show();
        panel.$.toggleClass('no-data', !items.length);

        var userInfo = User.get();
        if (userInfo && list.length && list[0].model == 2 && list[0].status == 1) {
            panel.$.find('[data-type="0"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="0"]').removeClass('on');



    });

});