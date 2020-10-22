/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 5D7D020880C070283BECDD2986644E77
*
* source file: htdocs/views/master/application/list/Application.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 某个企业下的产品列表。
*/
KISP.view('/Application', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Add = module.require('Add');
    var Manage = module.require('Manage');
    // var Forbidden = module.require('Forbidden');   //此功能暂时不做  判断用户数是否已超过，超过则跳出禁用客户
    var Purchase = module.require('Purchase');
    var Bind = module.require('Bind');
    var ChoseAcct = module.require('ChoseAcct');

    var meta = {
        company: null,
        product: null,
        application: null //应用列表
    };

    view.on('init', function () {
        ChoseAcct.on({
            'chosed-account': function chosedAccount(acctitem, appitem) {
                Main.getwxlurl({
                    acctitem: acctitem,
                    company: meta.company,
                    product: meta.product,
                    application: appitem
                });
            }
        });
        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function companyList() {
                view.fire('company-list');
            },
            // 跳转到企业列表页面
            'product-list': function productList() {
                view.fire('product-list', [meta.company]);
            },
            //刷新应用列表。
            'my-product': function myProduct() {
                Main.render(meta);
            },
            //添加应用。
            'add-application': function addApplication() {
                Add.render(meta);
            }
        });

        Main.on({
            'bind-account': function bindAccount(item) {
                //绑定账套
                Bind.render({
                    meta: meta,
                    application: item
                });
            },
            'paramset': function paramset(item) {
                //参数设置时选择账套
                ChoseAcct.render({
                    meta: meta,
                    application: item
                });
            },
            'purchase': function purchase(item) {
                //购买详情
                Purchase.render({
                    meta: meta,
                    application: item
                });
            },
            'add-users': function addUsers(item) {
                //添加用户
                var data = {
                    company: meta.company,
                    product: meta.product,
                    application: item
                };
                view.fire('add-users', [data]);
            },
            'user-manage': function userManage(item) {
                //移动应用用户管理
                var data = {
                    company: meta.company,
                    product: meta.product,
                    application: item
                };
                Manage.render(data);
            },
            'get-list': function getList(list) {
                //
                meta.application = list;
            }
            // 'update-fail': function (slvId, data) {
            //     Forbidden.render({
            //         meta: meta,
            //         slvId: slvId,
            //         updateInfo: data,
            //     });
            // },

        });

        Add.on({
            //添加产品成功，刷新产品列表。
            'success': function success() {
                Main.render(meta);
            }
        });

        Bind.on({
            //绑定账套成功，刷新产品列表。
            'success': function success() {
                Main.render(meta);
            }
        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product:{},      //产品信息
    *   };
    */
    view.on('render', function (data) {
        var company = meta.company = data.company;
        var product = meta.product = data.product;
        Header.render(meta);
        Main.render(meta);
    });
});