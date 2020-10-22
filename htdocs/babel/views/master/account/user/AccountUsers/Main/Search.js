/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 9545B6686835C2D0700939E5DA7729FF
*
* source file: htdocs/views/master/account/user/AccountUsers/Main/Search.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountUsers/Main/Search', function (require, module, panel) {

    var meta = {
        list: [] //外面传进来的列表数据，进行内部搜索。
    };

    panel.on('init', function () {
        function search(keyword) {
            if (!keyword) {
                panel.fire('submit', [meta.list, '']);
            }

            var items = meta.list.filter(function (item) {
                return item.phone.includes(keyword) || item.name.includes(keyword);
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