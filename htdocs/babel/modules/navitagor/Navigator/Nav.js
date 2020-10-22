/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 8E8B88DA6C74BB2886C83DDD72B31DB8
*
* source file: htdocs/modules/navitagor/Navigator/Nav.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 地址栏中的 hash 管理器。
* 以实现前进、后退、刷新功能，从而模仿传统的多页面效果。
* 此管理器仅针对主控台以外的视图，如 Login、Signup、Reset 等。
* 主控台(Master) 内部有自己的 hash 管理器。
*/
define('/Navigator/Nav', function (require, module, exports) {
    var KISP = require('KISP');
    var $String = KISP.require('String');

    //无需登录就能直接显示的视图。
    var views = ['Reset', 'Signup', 'Company'];

    return exports = {

        create: function create(name$fn) {
            var fnView = name$fn['view'];
            var fnOther = name$fn['other'];
            var fnNone = name$fn['none'];

            var nav = KISP.create('Navigator', module.id);

            //设置 hash 与 view 的映射转换关系。
            //如 `AccountUsers` <-> `/account-users.html`。
            //因此，地址栏中显示的是一种 hash，内部使用的可以是转换后的视图名。
            //如果不设置转换关系，则 hash 与 view 相同。

            //静态路由。
            nav.route({
                view$hash: {
                    'Login': '/index.html'
                },

                hash$view: {
                    '/index.html': 'Login'
                }

            });

            //动态路由。
            nav.route({
                //把 view 转成 hash。
                'toHash': exports.toHash,

                //把 hash 转成 view。
                'toView': exports.toView
            });

            nav.on({
                'none': function none(old) {
                    fnNone(old);
                },

                'start': function start(hash, old) {
                    if (views.includes(hash)) {
                        fnView(hash, old);
                        return;
                    }

                    //其它情况，即既非默认视图，也非通过 forward() 进来的视图。
                    //则交由外面处理。 此时一般为 Master 内部的视图。
                    fnOther();
                },

                '404': function _(hash, old) {
                    if (views.includes(hash)) {
                        fnView(hash, old);
                        return;
                    }

                    //其它情况，即既非默认视图，也非通过 forward() 进来的视图。
                    //则交由外面处理。 此时一般为 Master 内部的视图。
                    fnOther();
                },

                'view': function view(_view, args, info) {
                    var old = info.current;

                    if (old) {
                        old = old.view;
                    }

                    fnView(_view, old, args);
                }
            });

            return nav;
        },

        //把 view 转成 hash。
        toHash: function toHash(view) {
            if (!view) {
                return view;
            }

            view = $String.toHyphenate(view); // `AccountUsers` -> `-account-users`。
            view = view.slice(1); //`-account-users` -> `account-users`。
            view = '/' + view + '.html'; //`account-users` -> `/account-users.html`。

            return view;
        },

        //把 hash 转成 view。
        toView: function toView(hash) {
            //确保如 `/xx.html` 的格式。
            if (!/^\/.+\.html$/.test(hash)) {
                return hash;
            }

            hash = hash.slice(1, -5);
            hash = $String.toCamelCase(hash);
            hash = hash[0].toUpperCase() + hash.slice(1);

            return hash;
        }

    };
});