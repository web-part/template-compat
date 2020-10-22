
/*
* 
*/
KISP.panel('/Master/Sidebar/User', function(require, module, panel) {
    var API = module.require('API');

 

    var meta = {
        data: null, //外面传进来的数据。
    };


    panel.on('init', function () {
     

        panel.$on('click', {
            '[data-cmd="logout"]': function () {
                API.logout();
            },

            '[data-cmd="switch"]': function () {
                API.switch(meta.data.role);
            },

        });

        API.on('success', {
            'logout': function () {
                panel.fire('logout');
            },

            //切换角色成功后。
            //入参为切换后的角色值。
            'switch': function (role) {
                var user = Object.assign({}, meta.data, {
                    'role': role,
                });

                panel.fire('switch', [user]);
            },
        });

      
    });




    panel.on('render', function (data) {
        meta.data = data;


        panel.fill({
            'name': data.name,
            'avatar': data.avatar,
            'title': data.role == 1 ? '切换为管理模式' : '切换为工作模式',
        });

    });




});



