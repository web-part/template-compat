/*
* babel time: 2020-10-19 16:42:31
*
* source md5: F4EA441637AFE24C0E99436A36BAAF3E
*
* source file: htdocs/modules/master/Master.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Master', function (require, module, panel) {
    var KISP = require('KISP');
    var Sidebar = module.require('Sidebar');
    var Views = module.require('Views');
    var SessionStorage = KISP.require('SessionStorage');
    var Navigator = module.require('Navigator');

    var storage = new SessionStorage(module.id);

    var meta = {
        company: null //当前操作的企业，用于传递给 sidebar 菜单项中的某些视图，如 Products。
    };

    panel.on('init', function () {

        //刷新时，能恢复现场。
        meta = storage.get('meta') || { company: null };

        Navigator.on({
            'view': function view(_view, args, cache) {
                Views.open(_view, {
                    'args': args,
                    'render': !cache //根据是否为 cache 来刷新。
                });
            }
        });

        Sidebar.on({
            'logout': function logout() {
                Navigator.clear(); //先清空。
                panel.hide();
                panel.fire('logout');
            },
            'menu': function menu(item) {
                var view = item.view;
                var args = [];

                //这个视图需要传递企业信息过去。
                //企业信息是从企业列表页面点击某一项后保存到 Master.meta 里的。
                if (item.requireCompany) {
                    args = [meta];
                }

                Navigator.to(view, args);
            },

            'fold': function fold() {
                panel.$.toggleClass('hide');
            },

            'switch': function _switch(user) {
                Navigator.clear(); //先清空。

                panel.render(user);
                panel.fire('switch', [user]);
            }
        });

        Views.on({
            'require': function require(name) {
                var values = panel.fire('require', [name]);
                return values[0];
            },
            '404': function _(options) {
                KISP.alert('404');
                console.log('404', options);
            },

            'error': function error(opt, ex) {
                KISP.alert('error');
            },

            'active': function active(opt) {
                console.log(opt);

                //当显示`我的企业`、`注册企业`视图时，Sidebar 只显示 `我的企业` 菜单项。
                //否则，Sidebar 显示全部菜单项（通过切换 `show-all` 类）。
                var name = opt.name;
                var specials = ['Companys', 'Register', 'AddCompanys', 'Exp'];
                var isSpecial = specials.includes(name);
                var environment = KISP.data('environment');

                Sidebar.showAll(!isSpecial);
                Sidebar.showExp(environment == 'public');
                Sidebar.active(name);
            },

            'title': function title(id, _title) {}
        });
    });

    /**
    * 渲染。
    * 参数：
    *   user: {},       //必选，登录成功后的用户信息。
    *   opt: {
    *       view: '',   //必选，需要进一步打开更深层次的视图
    *       args: [],   //可选，打开视图里要传递过去的参数数组。
    *   },
    */
    panel.on('render', function (user, opt) {
        //Sidebar.render() 必须在 Navigator.render() 之前。
        //因为 Navigator.render() 后会高亮对应的菜单项，
        //所以 Sidebar 应该先渲染好。
        Sidebar.render(user);
        Navigator.render(user, opt);

        panel.fire('render');
    });

    panel.on('hide', function () {
        Navigator.enable(false);
    });

    panel.on('show', function () {
        Navigator.enable(true);
    });

    return {
        open: function open(view, args) {
            Navigator.to(view, args);
        },

        refresh: function refresh(view) {
            Views.refresh.apply(Views, arguments);
        },

        set: function set(data) {
            Object.assign(meta, data);
            storage.set('meta', meta);
        }

    };
});