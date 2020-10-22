
/**
* 路由器。
* 管理地址栏中的入口地址，包括
*   1，从外面带了参数跳转进来的。
*   2，地址栏中的 hash 管理器。
*       以实现前进、后退、刷新功能，从而模仿传统的多页面效果。
*       此管理器仅针对主控台以外的视图，如 Login、Signup、Reset 等。
*       主控台(Master) 内部有自己的 hash 管理器。
*/
KISP.panel('/Navigator', function (require, module, panel) {
    var KISP = require('KISP');
    var $String = KISP.require('String');
    var Nav = module.require('Nav');
    var Third = module.require('Third');


    var nav = null;
    var storage = null;

    var meta = {
        view: 'Login',
        args: [],
    };




    panel.on('init', function () {
        storage = KISP.create('SessionStorage', module.id);

        nav = Nav.create({
            'none': function (old) {
                //debugger
                var view = meta.view;
                var args = meta.args;

                if (view) {
                    if (old) { //原来就已经有视图的，通过去掉 `#` 后面的串导致变为空的。
                        panel.fire('view', [view, old, args]);
                    }
                    else {
                        module.exports.to(view, args);
                    }
                }
            },
            'view': function (view, old, args) {
                //debugger
                panel.fire('view', [view, old, args]);
            },
            'other': function () {
                //debugger
                panel.fire('other');
            },
        });
    });


    panel.on('init', function () {
        Third.on({
            //
            'none': function () {
                var info = storage.get('info');

                //普通的进入。
                if (!info) {
                    nav.render();
                    return;
                }


                //拦截第三方去掉 query 后再次跳转进来的。
                storage.remove('info');

                meta.view = info.view;  //view 可能为空，则表示不跳转。
                meta.args = info.args;

                nav.render();

                //恢复。
                meta = {
                    view: 'Login',
                    args: [],
                };

                if (info.fire) {
                    panel.fire(info.fire, [info.data]);
                }
            },

            //
            'jump': function (url, info) {
                storage.set('info', info);
                location.href = url;   //去掉一大串的 query 后重新跳转。 然后会进入 `none` 分支。
            },


        });


    });


    /**
    * 渲染。
    */
    panel.on('render', function () {
        Third.render();

    });



    return {

        /**
        * 由外面进入指定视图时，把该视图和渲染参数保存起来。
        * 该方法会改变 url 中的 hash，但不触发 hash 的 change 事件。
        */
        to: function (view, args) {
            //这个视图特殊。
            //会由 `routers/Login.js` 模块的 `render` 事件触发。
            //如果不加该拦截，则会死循环。
            if (view == 'Login' && location.hash == '#/index.html') {
                return;
            }

            args = args || [];
            nav.to(view, ...args);
        },

        /**
        * 清空 hash，但不触发 change 事件。
        */
        clear: function () {
            nav.clear();
        },

        /**
        * 设置启用或禁用。
        */
        enable: function (enabled) {
            nav.enable(enabled);
        },

        /**
        * 跳转。
        */
        jump: function (third) {
            Third.jump(third);
        },



    };
});