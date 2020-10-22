/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 658783DB8107F5A22A946013CB8FC91E
*
* source file: htdocs/views/company/bind/CompanyBind.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 绑定企业。
* 针对第三方平台跳过来的。
*/
KISP.view('/CompanyBind', function (require, module, view) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Footer = module.require('Footer');

    var meta = {
        bind: null, //用于提交绑定企业时的 third 数据包，请求列表时由后台返回。
        register: null, //用于跳到企业注册时的 third 数据包，请求列表时由后台返回。
        item: null //当前选中的项。
    };

    view.on('init', function () {
        function check() {
            //只要有一项为空，即为非法。
            var invalid = !meta.item || !meta.bind;

            Footer.render(!invalid);
        }

        Footer.on({
            //提交绑定。
            'submit': function submit() {
                API.post({
                    'third': meta.bind,
                    'item': meta.item
                });
            },

            //转到企业注册视图。
            'register': function register() {
                view.fire('register', [meta.register]);
            }

        });

        List.on({
            'change': function change(item) {
                meta.item = item;
                check();
            }
        });

        API.on('success', {

            //获取列表及其它信息。
            'get': function get(data) {
                meta.bind = data.bind;
                meta.register = data.register;

                List.render(data.companys);
            },

            //绑定成功。
            'post': function post(third) {
                view.fire('success', [third]); //后台返回新的第三方包，用于进一步跳转。
            }

        });
    });

    /**
    * 渲染。
    * 参数：
    *   third: {                //必选，第三方平台的信息。
    *       type: 3,            //必选，跳转类型，即第三方请求来源类型，用于给后台验证。          
    *       user_open_id: '',   //
    *       rand_state: '',     //
    *   },
    */
    view.on('render', function (third) {
        API.get(third);

        Footer.render(false);
    });

    return {};
});