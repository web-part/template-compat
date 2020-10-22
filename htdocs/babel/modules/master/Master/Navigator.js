/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 197D705D10C6F3C1B053CC23C7ABACC2
*
* source file: htdocs/modules/master/Master/Navigator.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* 地址栏中的 hash 管理器。
* 以实现前进、后退、刷新功能，从而模仿传统的多页面效果。
* 主控台(Master) 内部自己内部的 hash 管理器。
* 与退出登录后的那个外层的 hash 管理器不是同一个。
*/
KISP.panel('/Master/Navigator', function (require, module, panel) {
    var KISP = require('KISP');
    var Navigator = KISP.require('Navigator');
    var $String = KISP.require('String');

    var nav = null;

    var meta = {
        view: '', //默认视图的名称。
        args: [] //要传递给默认视图对应的参数列表。
    };

    panel.on('init', function () {

        nav = new Navigator(module.id, {
            /**
            * 是否启用模拟传统多页面的路由转换器。
            * 如果启用，则会把视图名与页面进行双向转换。
            * 如 `AccountUsers` <---> `/account-users.html`。
            */
            'simulate': true
        });

        nav.on({
            'none': function none() {
                var _nav;

                (_nav = nav).to.apply(_nav, [meta.view].concat(_toConsumableArray(meta.args)));
            },

            'start': function start() {
                var _nav2;

                (_nav2 = nav).to.apply(_nav2, [meta.view].concat(_toConsumableArray(meta.args)));
            },

            '404': function _() {
                window.history.back();
            },

            'view': function view(_view, args, info) {

                panel.fire('view', [_view, args, info.cache]);
            }

        });
    });

    panel.on('render', function (user, opt) {

        //同时指定特殊的跳转。
        if (opt) {
            meta.view = opt.view;
            meta.args = opt.args;
        } else {
            //否则，根据用户的角色判断。 
            meta.view = user.role == 1 ? 'Subject' : 'Companys'; //管理员的为 'Companys'，普通用户的为 'Subject'。
            meta.args = [];
        }

        nav.render();
    });

    return {

        /**
        * 由外面进入指定视图时，把该视图和渲染参数保存起来。
        * 该方法会改变 url 中的 hash，但不触发 hash 的 change 事件。
        */
        to: function to(view, args) {
            var _nav3;

            args = args || [];
            (_nav3 = nav).to.apply(_nav3, [view].concat(_toConsumableArray(args)));
        },

        /**
        * 清空 hash，但不触发 change 事件。
        */
        clear: function clear() {
            nav.clear();
        },

        /**
        * 设置启用或禁用。
        */
        enable: function enable(enabled) {
            nav.enable(enabled);
        }

    };
});