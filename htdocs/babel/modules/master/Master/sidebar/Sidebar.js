/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 40C8802F27B0E0A0B54B6A5212CAE6C9
*
* source file: htdocs/modules/master/Master/sidebar/Sidebar.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Master/Sidebar', function (require, module, panel) {
    var User = module.require('User');
    var Menus = module.require('Menus');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="fold"]': function dataCmdFold(event) {
                panel.fire('fold');
            }
        });

        User.on({
            'logout': function logout() {
                panel.fire('logout');
            },

            'switch': function _switch(user) {

                panel.fire('switch', [user]);
            }
        });

        Menus.on({
            'item': function item(_item) {
                panel.fire('menu', [_item]);
            }
        });
    });

    panel.on('render', function (user) {
        User.render(user);

        Menus.render({
            'role': user.role
        });
    });

    return {
        'showAll': Menus.showAll,
        'showExp': Menus.showExp,
        'active': Menus.active
    };
});