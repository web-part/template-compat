
/*
* 
*/
KISP.panel('/Messages/Sidebar', function (require, module, panel) {
    var API = module.require('API');
    var Types = module.require('Types');
    var List = module.require('List');


    var meta = {
        item: null,
        list: [],
    };


    panel.on('init', function () {
        Types.on({
            'change': function (types) {
                var list = API.filter(meta.list, types);

                List.render(list, meta.item);

                panel.$.toggleClass('no-message', !list.length);
                panel.fire('render');

            },
        });

        List.on({
            'render': function () {
                meta.item = null;   //已经渲染完成，清掉要打开的项，避免变更过滤条件时，再次触发。
            },

            'item': function (item) {
                panel.fire('item', [item]);
            },
            
        });



        API.on('success', {
            'get': function (list) {
                meta.list = list;
                Types.render();
            },
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
        'read': List.read,
    };


});



