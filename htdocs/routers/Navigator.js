/**
* 
*/
KISP.route('Navigator', function (require, module) {


    return {

        'view': function (view, old, args) {
            view = module.require(view);

            //先把旧视图隐藏。
            if (old) {
                old = module.require(old);
                old && old.hide();
            }

            args = args || [];
            view.render(...args);
        },

        //其它的视图，则交由 Login 处理。
        //Login 会判断是否已登录。
        'other': function () {
            var Login = module.require('Login');

            Login.render();
        },

        /**
        * 跳到账套列表页。
        * 因为是在 Master 里面的，要通过 Master 进入。
        */
        'account': function (data) {
            var Login = module.require('Login');
            var Master = module.require('Master');

            //设置用户信息到登录态。
            var user = Login.done(data.user);


            Master.render(user, {
                'view': 'Accounts',
                'args': [{
                    'company': data.company,
                    'product': data.product,
                }],
            });
            

        },

        /**
        * 跳到工作台页。
        * 因为是在 Master 里面的，要通过 Master 进入。
        */
        'subject': function (data) {
            var Login = module.require('Login');
            var Master = module.require('Master');

            //设置用户信息到登录态。
            var user = Login.done(data.user);


            Master.render(user, {
                'view': 'Subject',
                'args': [],
            });


        },
    };
});
