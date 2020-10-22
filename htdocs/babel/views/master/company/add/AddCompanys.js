/*
* babel time: 2020-10-19 16:41:38
*
* source md5: BE089229BCB89C8B6EB336B859937C5A
*
* source file: htdocs/views/master/company/add/AddCompanys.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.view('/AddCompanys', function (require, module, view) {
    var Content = module.require('Content');
    var Header = module.require('Header');

    view.on('init', function () {

        Content.on({
            //注册企业。
            'register': function register() {
                view.fire('register');
            }
        });

        Header.on({
            'ok': function ok() {
                var list = Content.get();
                Header.postData(list);
            },
            'company-list': function companyList() {
                view.fire('to-companys');
            },
            'search': function search(keyword) {
                Content.render(keyword);
            },
            //注册企业。
            'register': function register() {
                view.fire('register');
            },
            'add-success': function addSuccess() {
                view.fire('add-success');
            }
        });
    });

    view.on('render', function (data) {
        Content.render();
        Header.render();
    });
});