/*
* babel time: 2020-10-19 16:42:31
*
* source md5: DBF6A1A2C68377E6EFB9E5DF178B0E56
*
* source file: htdocs/modules/account/recover/AccountRecover/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 恢复账套对话框。
*/
KISP.panel('/AccountRecover/Content/List', function (require, module, panel) {

    var checkedNum;
    panel.on('init', function () {
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

                    return {
                        'index': index,
                        'accountName': item.back_name,
                        'size': item.size,
                        'time': item.back_time
                    };
                }
            }
        });
    });

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function dataCmdCheck() {

                if ($(this).hasClass('on')) {
                    checkedNum = '';
                    panel.$.find('[data-cmd="check"]').removeClass('on');
                    return;
                }
                panel.$.find('[data-cmd="check"]').removeClass('on');

                $(this).addClass('on');
                checkedNum = +this.getAttribute('data-index');
            }

        });
    });

    panel.on('render', function (data) {
        panel.$.toggleClass('no-data', !data.length);

        checkedNum = '';
        panel.fill({
            'items': data
        });
    });

    return {
        get: function get() {
            return checkedNum;
        }
    };
});