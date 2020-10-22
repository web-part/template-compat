/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 48EEA1DDDC2F56CFF66F8AC2A2484825
*
* source file: htdocs/views/master/company/auth/Auth.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 认证企业。
*/
KISP.view('/Auth', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');

    view.on('init', function () {
        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function companyList() {
                view.fire('company-list');
            }
        });

        Main.on({
            'submit': function submit() {
                view.fire('company-list');
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    view.on('render', function (data) {
        var company = data.company;

        Header.render(company);
        Main.render(company);
    });
});