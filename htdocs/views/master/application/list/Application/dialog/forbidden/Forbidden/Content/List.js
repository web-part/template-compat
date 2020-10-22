

KISP.panel('/Application/Forbidden/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var Info;


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
                    var rows = this.fill('row', data.items);

                    return {
                        'rows': rows,
                    };
                },

                'row': function (item, index) {
                    return {
                        'index': index,
                        'name': item.name,
                        'tel': item.phone,
                    };

                },
            },
        });

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                var index = +this.getAttribute('data-index');
                list[index].chosed = !list[index].chosed
                var checked = list[index].chosed;
                $(this).toggleClass('on', checked);
                var some = list.some(function (item) {
                    return !item.chosed;
                })

                panel.fire('allcheck', [!some]);
            },

        });
    })




    panel.on('render', function (items) {

        list = items;

        panel.fill({
            'items': list,
        });

    });
    return {
        get: function () {
            var select = [];
            list.forEach(item => {
                if (item.chosed) { 
                    select.push(item.origin.user_id);
                }
            })
            return select;
        },
        checkall: function (checked) {
            list.forEach(function (item, index) {
                item.chosed = checked;
            })
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        }
    }



});






