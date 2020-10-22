/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 04D7AE40A21EA108146533866C5CEEDD
*
* source file: htdocs/modules/message/list/Messages/Sidebar.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Messages/Sidebar', function (require, module, panel) {
    var API = module.require('API');
    var Types = module.require('Types');
    var List = module.require('List');

    var meta = {
        item: null,
        list: []
    };

    panel.on('init', function () {
        Types.on({
            'change': function change(types) {
                var list = API.filter(meta.list, types);

                List.render(list, meta.item);

                panel.$.toggleClass('no-message', !list.length);
                panel.fire('render');
            }
        });

        List.on({
            'render': function render() {
                meta.item = null; //已经渲染完成，清掉要打开的项，避免变更过滤条件时，再次触发。
            },

            'item': function item(_item) {
                panel.fire('item', [_item]);
            }

        });

        API.on('success', {
            'get': function get(list) {
                meta.list = list;
                Types.render();
            }
        });
    });

    /**
    * 渲染。
    * 参数：
    *   item: {},   //加载完成后要打开的消息。
    */
    panel.on('render', function (item) {
        meta.item = item;

        API.get();
    });

    return {
        'read': List.read
    };
});