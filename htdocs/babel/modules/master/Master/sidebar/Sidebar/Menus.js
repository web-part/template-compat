/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 565373B47CDCD63FBF6AAEAD2B96F855
*
* source file: htdocs/modules/master/Master/sidebar/Sidebar/Menus.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Master/Sidebar/Menus', function (require, module, panel) {
    var KISP = require('KISP');
    var $String = KISP.require('String');
    var SessionStorage = KISP.require('SessionStorage');

    var list = [];
    var id$item = {};
    var highlights = {};

    function highlight(id) {

        var li = 'li[data-id="' + id + '"]';
        var $li = panel.$.find(li);

        if (!$li.length) {
            throw new Error('不存在 data-id 为 ' + id + ' 的元素');
        }

        panel.$.find('li').removeClass('on');
        $li.addClass('on');
    }

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {

        panel.$.on('click', 'li', function (event) {
            var li = this;
            var id = li.getAttribute('data-id');
            var item = id$item[id];

            if (!item.view) {
                return;
            }

            highlight(id);
            panel.fire('item', [item]);
        });
    });

    /**
    * 渲染时触发。
    * 即外界显式调用 render() 时触发，且每次调用都会触发一次。
    * 外界传进来的参数会原样传到这里。
    *   opt = {
    *       role: 1|2,    //用户角色。 1: 普通用户。 2: 管理员。
    *       
    *   };
    */
    panel.on('render', function (opt) {
        var data = require('data.Sidebar');

        id$item = {};
        highlights = data.highlights;
        list = data[opt.role];

        panel.fill(list, function (item, index) {

            var id = item.view || $String.random();

            id$item[id] = item; //以 id 关联整个 item。

            return {
                'id': id,
                'name': item.name,
                'icon': item.icon,
                'href': item.href,
                'a-display': item.href ? '' : 'display: none;'
            };
        });

        //panel.$.find('li:eq(0)').click(); //激活首项。

    });

    return {
        showAll: function showAll(_showAll) {
            panel.$.toggleClass('show-all', !!_showAll);
        },
        showExp: function showExp(_showExp) {
            panel.$.toggleClass('show-exp', _showExp);
        },

        active: function active(view) {

            var id = highlights[view];

            if (!id) {
                id = Object.keys(id$item).find(function (id) {
                    var item = id$item[id];
                    return item.view == view;
                });
            }

            if (!id) {
                return;
            }

            highlight(id);
        }
    };
});