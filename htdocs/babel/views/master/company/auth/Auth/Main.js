/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 7EA8A595684E78F0711AEDDDB074EB61
*
* source file: htdocs/views/master/company/auth/Auth/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
* 
*/
KISP.panel('/Auth/Main', function (require, module, panel) {

    var API = module.require('API'); //
    var Base = module.require('Base'); //基础信息。
    var User = module.require('User'); //联系人信息。
    var Auth = module.require('Auth'); //认证信息。

    var Submit = module.require('Submit'); //保存和提交。


    var meta = {
        company: null
    };

    panel.on('init', function () {

        Submit.on({
            //保存、提交的公共逻辑，预处理。
            'click': function click() {
                var base = Base.get();
                var user = User.get();
                var auth = Auth.get();

                return { base: base, user: user, auth: auth };
            },

            //保存。 根据需求去掉保存
            // 'save': function (form) {
            //     API.save(meta.company, form);
            // },

            //提交。
            'submit': function submit(form) {
                var list = [].concat(_toConsumableArray(form.base), _toConsumableArray(form.user), _toConsumableArray(form.auth));

                var item = list.find(function (item) {
                    return typeof item.value == 'function';
                });

                if (item) {
                    item.value(); //错误处理。
                } else {
                    API.submit(meta.company, form);
                }
            }
        });

        Base.on({
            'set-code': function setCode(data) {
                Auth.setCode(data);
            }
        });

        API.on('success', {
            'save': function save() {},

            'submit': function submit() {
                panel.fire('submit');
            }
        });
    });

    panel.on('render', function (company) {
        meta.company = company;

        Base.render(company);
        User.render();
        Auth.render();
        Submit.render();
    });
});