
/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover/Content/List', function (require, module, panel) {
    
    var checkedNum;
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
                        'accountName': item.back_name,
                        'size': item.size,
                        'time': item.back_time,
                    };

                },
            },
        });

    });

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                
                if ($(this).hasClass('on')) { 
                    checkedNum = '';
                    panel.$.find('[data-cmd="check"]').removeClass('on');
                    return;
                }
                panel.$.find('[data-cmd="check"]').removeClass('on');
                
                $(this).addClass('on');
                checkedNum = +this.getAttribute('data-index');
            },

        });

    });

    panel.on('render', function (data) {
        panel.$.toggleClass('no-data', !data.length);

        checkedNum = '';
        panel.fill({
            'items': data,
        });
    });

    return {
        get: function () {
            return checkedNum;
        }
    }
});





