/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 4B9D1369449ED55F9F157607494A9EAB
*
* source file: htdocs/views/master/product/user/ProductUsers/Main/List.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/ProductUsers/Main/List', function (require, module, panel) {

    var list = [];

    var meta = {
        keyword: ''
    };

    panel.on('init', function () {

        function highlight(value) {
            var keyword = meta.keyword;

            if (!keyword || !value) {
                return value;
            }

            value = value.split(keyword).join('<span class="keyword">' + keyword + '</span>');
            return value;
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

                'row': function row(item, index) {

                    return {
                        'index': index,
                        'phone': highlight(item.phone),
                        'name': highlight(item.name),
                        'account': highlight(item.account),
                        'product': highlight(item.product)
                    };
                }
            }
        });
    });

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function dataCmd() {
                var index = +this.getAttribute('data-index');
                var cmd = this.getAttribute('data-cmd');
                var item = list[index];

                panel.fire('cmd', cmd, [item]);
            }

        });
    });

    /**
    *   items = [
    *       {},
    *   ];
    */
    panel.on('render', function (items, keyword) {

        list = items;
        meta.keyword = keyword || '';

        panel.fill({
            'items': items
        });

        panel.$.toggleClass('no-data', !items.length);
    });

    return {};
});