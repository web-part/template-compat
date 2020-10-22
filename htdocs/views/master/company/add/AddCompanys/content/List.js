

KISP.panel('/AddCompanys/Content/List', function (require, module, panel) {
    
    var User = require('User');

    var list = {};
    var allChosed = null;
    var status$text = {
        '0': '未认证',
        '1': '审核中',
        '2': '已认证',
        '3': '认证失败'
    };
    panel.on('init', function () {
        panel.template({
            '': function (data) {
                var table = this.fill('table', data);
                var add = this.fill('add', data);

                return {
                    'table': table,
                    'add': add,
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
                        return {
                            'index': index,
                            'name': item.name,
                            'num': item.num,
                            'phone': item.phone,
                            'status': status$text[item.status],
                            'creatName': item.creatName,
                            'ifChecked': item.ifChecked ? 'has-chosed' : '',
                        };

                    },
                },
            },

            //无数据时，显示一个大大的创建按钮。
            'add': function (data) {
                return data.items.length ? '' : {};
            },
        });

        panel.$on('click', {
            '[data-cmd="check"]': function () {
                var index = +this.getAttribute('data-index');
                var item = list.now[index];
                var ifAllChosed = true;

                if (list.origin[index].ifChecked) {
                    return;
                }

                $(this).toggleClass('on');
                item.ifChecked = !item.ifChecked;

                list.now.forEach(function (item, index) {
                    if (!item.ifChecked) {
                        ifAllChosed = false;
                    }
                })

                if (ifAllChosed == allChosed) {
                    return;
                }
                allChosed = ifAllChosed;

                panel.fire('chose-status', [ifAllChosed]);

            }
        });

    });



    panel.on('render', function (data) {
        list = data;
        list.now.forEach(function (item, index) {
            item.ifChecked ? '' : allChosed = false;
        });
        panel.fill({
            'items': list.now,
        });

        var userInfo = User.get();
        
        if (userInfo) {
            panel.$.find('[data-type="create-com"]').addClass('on');
            return;
        }
        panel.$.find('[data-type="create-com"]').removeClass('on');


    });

    return {
        'setStatus': function (status) {
            allChosed = status;
            panel.$.find('[data-cmd="check"]').toggleClass('on', status);
        },
        'get': function () {
            
            var chosedData = [];
            list.now.forEach(function (item, index) {
                if (item.ifChecked && !list.origin[index].ifChecked) { 
                    chosedData.push(item.tid);
                }
            })
           
            return chosedData;
        }
    };


});






