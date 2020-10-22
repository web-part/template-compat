/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 48BFC4EC67D3B3AEAB922454FBFD2CDA
*
* source file: htdocs/views/master/product/user/ProductUsers/Main/Search.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/ProductUsers/Main/Search', function (require, module, panel) {

    var meta = {
        list: [] //外面传进来的列表数据，进行内部搜索。
    };

    panel.on('init', function () {
        var keys = ['phone', 'name', 'account', 'product'];

        function search(keyword) {
            if (!keyword) {
                panel.fire('submit', [meta.list, '']);
            }

            var items = meta.list.filter(function (item) {
                var found = keys.some(function (key) {
                    var value = item[key];
                    if (typeof value != 'string') {
                        return;
                    }

                    return value.includes(keyword);
                });

                return found;
            });

            panel.fire('submit', [items, keyword]);
        }

        panel.$bind('input', {
            'input': function input(event) {
                var keyword = panel.$.find('input').val();
                search(keyword);
            }
        });

        panel.$on('click', {
            '[data-cmd="submit"]': function dataCmdSubmit() {
                var keyword = panel.$.find('input').val();

                search(keyword);
            }

        });
    });

    /**
    * 
    */
    panel.on('render', function (list) {

        meta.list = list;
    });

    return {};
});