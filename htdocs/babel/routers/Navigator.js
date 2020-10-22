/*
* babel time: 2020-10-19 16:42:32
*
* source md5: AB8BD65518EE4E93E54E1CA87FE2C4D0
*
* source file: htdocs/routers/Navigator.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
* 
*/
KISP.route('Navigator', function (require, module) {

    return {

        'view': function view(_view, old, args) {
            var _view2;

            _view = module.require(_view);

            //先把旧视图隐藏。
            if (old) {
                old = module.require(old);
                old && old.hide();
            }

            args = args || [];
            (_view2 = _view).render.apply(_view2, _toConsumableArray(args));
        },

        //其它的视图，则交由 Login 处理。
        //Login 会判断是否已登录。
        'other': function other() {
            var Login = module.require('Login');

            Login.render();
        },

        /**
        * 跳到账套列表页。
        * 因为是在 Master 里面的，要通过 Master 进入。
        */
        'account': function account(data) {
            var Login = module.require('Login');
            var Master = module.require('Master');

            //设置用户信息到登录态。
            var user = Login.done(data.user);

            Master.render(user, {
                'view': 'Accounts',
                'args': [{
                    'company': data.company,
                    'product': data.product
                }]
            });
        },

        /**
        * 跳到工作台页。
        * 因为是在 Master 里面的，要通过 Master 进入。
        */
        'subject': function subject(data) {
            var Login = module.require('Login');
            var Master = module.require('Master');

            //设置用户信息到登录态。
            var user = Login.done(data.user);

            Master.render(user, {
                'view': 'Subject',
                'args': []
            });
        }
    };
});