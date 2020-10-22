/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 1E032710F3F46DED5B27EAB03D3B38B2
*
* source file: htdocs/views/master/company/list/Companys.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

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
            'company-list': function companyList() {
                Main.render();
            },

            //添加企业。
            'add-company': function addCompany() {
                //Register.render();
                view.fire('add-company');
            }
        });

        Main.on({
            'item': function item(_item) {
                view.fire('item', [_item]);
            },
            'no-company': function noCompany() {
                view.fire('no-company');
            },
            //注册企业。
            'register': function register() {
                //Register.render();
                view.fire('register');
            },

            //认证企业。
            'auth': function auth(item) {
                Auth.render(item);
                view.fire('auth', [item]);
            }
        });

        Auth.on({
            'success': function success(data) {
                //window.open(data.url);
                //view.fire('auth', [data]);
            }
        });
    });

    view.on('render', function () {
        Header.render();
        Main.render();
    });
});