/*
* babel time: 2020-10-19 16:42:31
*
* source md5: F5B19027AFC612BEC82EF791F0EE1F6D
*
* source file: htdocs/modules/master/Master/sidebar/Sidebar/User.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/Master/Sidebar/User', function (require, module, panel) {
    var API = module.require('API');

    var meta = {
        data: null //外面传进来的数据。
    };

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="logout"]': function dataCmdLogout() {
                API.logout();
            },

            '[data-cmd="switch"]': function dataCmdSwitch() {
                API.switch(meta.data.role);
            }

        });

        API.on('success', {
            'logout': function logout() {
                panel.fire('logout');
            },

            //切换角色成功后。
            //入参为切换后的角色值。
            'switch': function _switch(role) {
                var user = Object.assign({}, meta.data, {
                    'role': role
                });

                panel.fire('switch', [user]);
            }
        });
    });

    panel.on('render', function (data) {
        meta.data = data;

        panel.fill({
            'name': data.name,
            'avatar': data.avatar,
            'title': data.role == 1 ? '切换为管理模式' : '切换为工作模式'
        });
    });
});