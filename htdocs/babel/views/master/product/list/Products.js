/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 5E6C2C485D61A0650CC53AE3C9880D11
*
* source file: htdocs/views/master/product/list/Products.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 某个企业下的产品列表。
*/
KISP.view('/Products', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Active = module.require('Active');
    var Buy = module.require('Buy');
    var Add = module.require('Add');
    var Delete = module.require('Delete');
    var Detail = module.require('Detail');
    var Certify = module.require('Certify');
    var Trial = module.require('Trial');

    var meta = {
        company: null
    };

    view.on('init', function () {

        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function companyList() {
                view.fire('company-list');
            },

            //刷新产品列表。
            'product-list': function productList() {
                Main.render(meta.company);
            },

            //添加产品。
            'add-product': function addProduct() {
                Add.render(meta.company);
            }
        });

        Main.on({
            'get-list': function getList(list) {
                Header.setList(list);
            },

            //试用。
            'trial': function trial(item) {
                Trial.render({
                    'company': meta.company,
                    'product': item
                });
            }
        });

        Main.on('cmd', {
            //账套备份列表。
            'baks': function baks(item) {
                view.fire('account-baks', [{
                    'company': meta.company,
                    'product': item
                }]);
            },
            //在线用户列表。
            'users': function users(item) {
                view.fire('users', [{
                    'company': meta.company,
                    'product': item
                }]);
            },
            //应用列表。
            'app-list': function appList(item) {
                view.fire('app-list', [{
                    'company': meta.company,
                    'product': item
                }]);
            },
            //激活产品。
            'active': function active(item) {
                Active.render({
                    'company': meta.company,
                    'product': item
                });
            },

            //我要购买，即新购。
            'buy': function buy(item) {
                Buy.render({
                    'product': item
                });
            },

            //创建账套。
            'create': function create(item) {
                view.fire('create-account', [{
                    'company': meta.company,
                    'product': item
                }]);
            },
            //跳转到账套列表。
            'list': function list(item) {
                view.fire('account-list', [{
                    'company': meta.company,
                    'product': item
                }]);
            },
            //产品详情。
            'detail': function detail(item) {
                Detail.render(item);
            },
            //删除产品。
            'delete': function _delete(item) {
                Delete.render({
                    'company': meta.company,
                    'product': item
                });
            }
        });

        Add.on({
            //添加产品成功，刷新产品列表。
            'success': function success() {
                Main.render(meta.company);
            }
        });

        Active.on({
            //激产品成功，刷新产品列表。
            'success': function success() {
                Main.render(meta.company);
            }
        });

        Delete.on({
            //删除成功，刷新产品列表。
            'success': function success(data) {
                Main.render(meta.company);
            }
        });

        Certify.on({
            //跳到企业认证。
            'ok': function ok() {
                view.fire('auth', [meta.company]);
            }
        });

        Trial.on({
            'certify': function certify(msg) {
                Certify.render(msg);
            },

            //跳到企业认证。
            'auth': function auth() {
                view.fire('auth', [meta.company]);
            },

            //试用成功。
            'success': function success() {
                Main.refresh();
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
        var company = meta.company = data.company;

        Header.render(company);
        Main.render(company);
    });
});