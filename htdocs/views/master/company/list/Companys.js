
/*
* 企业列表。
*/
KISP.view('/Companys', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Register = module.require('Register');
    var Auth = module.require('Auth');

    view.on('init', function () {

        Header.on({
            //刷新企业列表。
            'company-list': function () {
                Main.render();
            },

            //添加企业。
            'add-company': function () {
                //Register.render();
                view.fire('add-company');
            },
        });


        Main.on({
            'item': function (item) {
                view.fire('item', [item]);
            },
            'no-company': function () { 
                view.fire('no-company');
            },
            //注册企业。
            'register': function () {
                //Register.render();
                view.fire('register');
            },

            //认证企业。
            'auth': function (item) {
                Auth.render(item);
                view.fire('auth', [item]);
            },
        });

        Auth.on({
            'success': function (data) {
                //window.open(data.url);
                //view.fire('auth', [data]);
            },
        });


    });


    view.on('render', function () {
        Header.render();
        Main.render();

        

    });



});





