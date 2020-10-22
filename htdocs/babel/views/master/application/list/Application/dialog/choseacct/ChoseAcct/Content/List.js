/*
* babel time: 2020-10-19 16:41:37
*
* source md5: A65190CD527157A55410F4DB154D3842
*
* source file: htdocs/views/master/application/list/Application/dialog/choseacct/ChoseAcct/Content/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Application/ChoseAcct/Content/List', function (require, module, panel) {

    var User = require('User');

    var list = [];
    var Info;
    var chosedItem;

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
                    var rows = this.fill('row', data.items, data.keyword);

                    return {
                        'rows': rows
                    };
                },

                'row': function row(item, index, keyword) {
                    var haschosed = false;
                    if (chosedItem[0].origin) {
                        haschosed = item.origin.account_id === chosedItem[0].origin.account_id;
                    }
                    return {
                        'index': index,
                        'name': item.name,
                        'number': item.number,
                        'on': haschosed ? 'on' : ''
                    };
                }
            }
        });
    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function dataCmdCheck() {

                var index = +this.getAttribute('data-index');

                panel.$.find('[data-cmd="check"]').removeClass('on');
                $(this).addClass('on');
                chosedItem = [list[index]];

                panel.$.find('[data-type="0"]').removeClass('on');
            }

        });
    });

    panel.on('render', function (items, nowChosed) {
        list = items;
        chosedItem = [nowChosed];
        panel.fill({
            'items': list
        });
    });

    return {
        getChosed: function getChosed() {
            return chosedItem;
        }
    };
});