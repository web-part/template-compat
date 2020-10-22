/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 03FF7C22D3E061FDEB4197883ABDFEED
*
* source file: htdocs/modules/update/list/Updates.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
* 更新日志列表。
*/
KISP.panel('/Updates', function (require, module, panel) {
    var API = module.require('API');
    var Header = module.require('Header');
    var List = module.require('List');
    var More = module.require('More');

    var meta = {
        no: 1, //当前页码，会给动态改变。
        size: 6, //每页（次）要加载的条数，固定的。
        list: [] //当前使用的全部数据。
    };

    function _hide(fn) {
        panel.$.removeClass('on');

        setTimeout(function () {
            panel.hide();
            fn && fn();
        }, 300);
    }

    function show(fn) {
        panel.show();
        panel.$.addClass('on');
        panel.fire('show');

        setTimeout(function () {
            fn && fn();
        }, 300);
    }

    panel.on('init', function () {
        panel.set('show', false);

        Header.on({
            //关闭按钮。
            'close': function close() {
                _hide();
            }
        });

        API.on('success', {
            'get': function get(items, page) {
                meta.no = page.no; //加载成功后，更新当前的页码。
                meta.list = [].concat(_toConsumableArray(meta.list), _toConsumableArray(items)); //跟之前的数据合并。

                List.render(meta.list);
                More.render(page);
            }
        });

        List.on({
            'item': function item(_item) {}
        });

        More.on({
            'submit': function submit() {

                API.get({
                    'no': meta.no + 1,
                    'size': meta.size
                });
            }
        });
    });

    /**
    * 渲染。
    */
    panel.on('render', function () {
        var visible = panel.visible();

        if (visible) {
            //当前是可见的。
            _hide();
            return;
        }

        //当前是隐藏的，切换为显示，重新加载。
        show(function () {
            meta.no = 1;
            meta.list = [];

            Header.render();
            API.get(meta);
        });
    });

    return {
        /**
        * 给外面手动隐藏。
        * 如弹出消息中心时，需要手动隐藏本面板。
        */
        hide: function hide() {
            var visible = panel.visible();

            if (visible) {
                _hide();
            }
        }
    };
});