

KISP.panel('/Application/Bind/Content/List', function (require, module, panel) {

    var User = require('User');

    var isbind = null;
    var list = [];
    var Info;
    var chosedItem;


    panel.on('init', function () {
        var status$text = {
            0: { text: '未绑定', },
            1: { text: '已绑定', },
            2: { text: '已绑定（已删除）', },
            3: { text: '已绑定（已禁用）', },
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
                    var rows = this.fill('row', data.items, data.keyword);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index, keyword) {
                    return {
                        'index': index,
                        'name': item.name,
                        'number': item.number,
                        'status': status$text[item.status].text,
                        'gray': isbind ? 'gray' : '',
                        'on': item.status ? 'on' : '',
                    };

                },
            },
        });

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                if (isbind) {
                    return;
                }
                var index = +this.getAttribute('data-index');

                panel.$.find('[data-cmd="check"]').removeClass('on');
                $(this).addClass('on');
                chosedItem = [list[index]];

                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });
    })




    panel.on('render', function (items, bind) {
        isbind = bind;
        list = items;
        chosedItem = [];
        panel.fill({
            'items': list,
        });

    });

    return {
        getChosed() {
            return chosedItem;
        }
    }

});






