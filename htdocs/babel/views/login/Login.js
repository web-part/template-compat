/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 96E5B7D28998DE469127D9F9D5B4A400
*
* source file: htdocs/views/login/Login.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.view('/Login', function (require, module, view) {
    var Storage = module.require('Storage');
    var Auto = module.require('Auto');
    var Main = module.require('Main');

    var meta = {
        data: null //外面传进来的数据，包括 third 包（如果有）。
    };

    view.set('show', false);

    view.on('init', function () {

        function _success(user) {
            view.hide(); //这个是必须的，否则会遮拦住 Master 视图。
            view.fire('success', [user]); //
        }

        Main.on({
            //重置密码。
            'reset': function reset(third) {
                view.fire('reset', [third]);
            },

            //立即注册。
            'sign-up': function signUp(third) {
                view.fire('sign-up', [third]);
            },

            'render': function render() {
                view.fire('render');
            },

            //手动登录成功。
            'login': {
                //内部的登录成功。
                'self': function self(user) {
                    user = module.exports.done(user);
                    _success(user);
                },

                //第三方的登录成功。
                'third': function third(_third) {
                    view.fire('third', [_third]); //让外面重新跳转。
                }
            }

            // 'updates': function () {  //目前未登录不允许查看日志
            //     view.fire('updates');
            // },


        });

        Auto.on({
            //自动登录成功。
            'success': function success(user) {
                user = module.exports.done(user);
                _success(user);
                location.href = location.href.split('?')[0]; //重新跳转，去掉 url 中的一大串参数。
            },

            //自动登录失败。
            'fail': function fail() {
                Storage.clear();
                view.show();
                Main.render();
            },

            //普通的登录。
            'none': function none() {
                var user = Storage.get(); //检查是否已经登录。

                if (user) {
                    _success(user);
                    return;
                }

                view.show();
                Main.render(meta.data);
            }
        });
    });

    /**
    * 注册成功后，带进来一些数据，实现自动填充。
    *   data = { 
    *       phone: '',      //可选，手机号。
    *       password: '',   //可选，密码。
    *       third: {},      //可选，从第三方平台进来的。 
    *   };
    */
    view.on('render', function (data) {
        meta.data = data;

        Auto.render();
    });

    return {
        logout: function logout() {
            Storage.clear();
            view.render();
            view.fire('logout');
        },

        /**
        * 内部或第三方登录成功后。
        * 转换为前端使用的数据格式，并设置一下现场。
        */
        done: function done(user) {
            user = {
                'role': user['role'], //角色。
                'uid': user['uid'],
                'name': user['nickname'] || user['name'] || '（无名）',
                'avatar': user['avatar'] || 'style/img/7.png',
                'token': user['access_token'] || user['token'],
                'is_new': user['is_new']
            };

            Storage.set(user);

            return user;
        }
    };
});