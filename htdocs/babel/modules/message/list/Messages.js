/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 838E6544E65F4A6D92B7BC0365F4656D
*
* source file: htdocs/modules/message/list/Messages.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 消息列表。
*/
KISP.panel('/Messages', function (require, module, panel) {
    var Sidebar = module.require('Sidebar');
    var Main = module.require('Main');

    function _hide() {
        panel.$.removeClass('on');

        setTimeout(function () {
            panel.hide();
            Main.render(null);
        }, 300);
    }

    function show(item) {
        panel.show();
        panel.$.addClass('on');
        panel.fire('show');

        setTimeout(function () {
            Sidebar.render(item);
        }, 300);
    }

    panel.on('init', function () {
        panel.set('show', false);

        //关闭按钮。
        panel.$on('click', {
            '[data-cmd="close"]': function dataCmdClose(event) {
                _hide();
            }
        });

        Sidebar.on({
            //点击列表的某一项。
            'item': function item(_item) {
                Main.render(_item);
            },

            //列表重新填充，清空主体内容。
            'render': function render() {
                Main.render(null);
            }
        });

        Main.on({
            //详情已读，通知列表更新状态。
            'read': function read(item) {
                Sidebar.read(item);
                panel.fire('read'); //用于更新 Header 的 `通知` 图标。
            }
        });
    });

    /**
    * 渲染。
    * 参数：
    *   item: {},   //外面通过点击某条消息跳进来的，加载完成后要打开此条消息。
    */
    panel.on('render', function (item) {
        var visible = panel.visible();

        //当前是可见的。
        if (visible) {
            if (item) {
                //指定了要打开此消息，则直接打开。
                Sidebar.render(item);
            } else {
                //否则，切换为隐藏。
                _hide();
            }
        } else {
            //当前是隐藏的，切换为显示。
            show(item);
        }
    });

    return {
        /**
        * 给外面手动隐藏。
        * 如弹出更新日志时，需要手动隐藏本组件。
        */
        hide: function hide() {
            var visible = panel.visible();

            if (visible) {
                _hide();
            }
        }
    };
});