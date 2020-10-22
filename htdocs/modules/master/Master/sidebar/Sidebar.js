
/*
* 
*/
KISP.panel('/Master/Sidebar', function (require, module, panel) {
    var User = module.require('User');
    var Menus = module.require('Menus');


    panel.on('init', function () {


        panel.$on('click', {
            '[data-cmd="fold"]': function (event) {
                panel.fire('fold');
            },
        });


        User.on({
            'logout': function () {
                panel.fire('logout');
            },

            'switch': function (user) {

                panel.fire('switch', [user]);

            },
        });

        Menus.on({
            'item': function (item) {
                panel.fire('menu', [item]);
            },
        });


    });


    panel.on('render', function (user) {
        User.render(user);

        Menus.render({
            'role': user.role,
        });

    });

    return {
        'showAll': Menus.showAll,
        'showExp': Menus.showExp,
        'active': Menus.active,
    };


});



