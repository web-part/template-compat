

KISP.panel('/Application/ChoseAcct/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var Info;
    var chosedItem;


    panel.on('init', function () {
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
                    var haschosed = false;
                    if (chosedItem[0].origin) {
                        haschosed = item.origin.account_id === chosedItem[0].origin.account_id;
                    }
                    return {
                        'index': index,
                        'name': item.name,
                        'number': item.number,
                        'on': haschosed ? 'on' : '',
                    };

                },
            },
        });

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {

                var index = +this.getAttribute('data-index');

                panel.$.find('[data-cmd="check"]').removeClass('on');
                $(this).addClass('on');
                chosedItem = [list[index]];

                panel.$.find('[data-type="0"]').removeClass('on');
            },

        });
    })




    panel.on('render', function (items, nowChosed) {
        list = items;
        chosedItem = [nowChosed];
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






