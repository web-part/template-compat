/*
* babel time: 2020-10-19 16:41:38
*
* source md5: EDB6CA2BC11799DB5D5F70DD4EE32E59
*
* source file: htdocs/views/master/company/register/Register.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 注册企业。
*/
KISP.view('/Register', function (require, module, view) {
    var API = module.require('API');
    var Header = module.require('Header');
    var Types = module.require('Types');
    var Form = module.require('Form');

    var meta = {
        type: ''
    };

    view.on('init', function () {

        Header.on({
            //跳回到企业列表。
            'company-list': function companyList() {
                view.fire('company-list');
            }
        });

        Types.on({
            'change': function change(item) {
                meta.type = item.value;
                Form.show();
            }
        });

        Form.on({
            'submit': function submit(name) {
                API.post({
                    'type': meta.type,
                    'name': name
                });
            }
        });

        API.on({
            //注册企业成功，跳回企业列表页。
            'success': function success() {
                view.fire('addcompany-list');
            }
        });
    });

    view.on('render', function () {
        meta.type = '';

        Header.render();
        Types.render();
        Form.render();
    });
});