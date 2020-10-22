
/*
* 某个产品下的账套列表。
*/
KISP.view('/Accounts', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');
    var Confirm = module.require('Confirm');
    var Delete = module.require('Delete');
    var App = module.require('App');
    var Apps = module.require('Apps');

    var meta = {
        company: null,
        product: null,
    };


    view.on('init', function () {

        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function () {
                view.fire('company-list');
            },

            //跳到产品列表，传企业信息过去。
            'product-list': function () {
                view.fire('product-list', [meta.company]);
            },

            //刷新账套列表。
            'account-list': function () {
                Main.render(meta);
            },

            //创建账套。
            'create-account': function () {
                view.fire('create-account', [meta]);
            },

            'recover-account': function () {
                Main.checkRecover(meta);
            },
        });

        Apps.on({
            //应用列表为空的，直接打开插件。  ---变态、不合理的需求。
            'account': function (item) {
                view.fire('open', [{
                    'tid': meta.company.origin['tid'],
                    'acctid': item.origin['account_id'],
                }]);
            },

            //获取应用的跳转地址成功。
            'url': function (url) {
                view.fire('url', [url]);
            },
        });

        Main.on({
            'check-recover': function (list) {
                view.fire('recover-account', [meta]);
            },

            'users': function (item) {
                view.fire('add-user', [{
                    'company': meta.company,
                    'product': meta.product,
                    'account': item,
                }]);
            },

            'check-user': function (item) {
                Confirm.render(item);
            },

            'to-baks': function () {
                view.fire('to-baks', [{
                    'company': meta.company,
                    'product': meta.product,
                }]);
            },

            //创建账套。
            'create-account': function () {
                view.fire('create-account', [meta]);
            },

            //跳到应用列表。
            'apps': function (item) {
                Apps.render(item);
                return;

                //跳到应用列表视图。
                //该视图已暂时不用了，改成了弹窗的方式。
                view.fire('apps', [{
                    'company': meta.company,
                    'product': meta.product,
                    'account': item,
                }]);
            },

        });

        Confirm.on({
            'ok': function (account) {
                var direct = account.status == 3 || account.status == 4;
                var opt = {
                    'company': meta.company,
                    'product': meta.product,
                    'account': account,
                };

                if (direct) {
                    opt['fn'] = function (meta) {
                        Main.render(meta);
                    };

                    Delete.delete(opt);
                }
                else {
                    Delete.render(opt);
                }
            },
        });


        Delete.on({
            //删除账套成功，刷新账套列表。
            'success': function () {
                Main.render(meta);
            },
        });


    });


    /**
    * 渲染。
    * 参数：
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    view.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;

        Header.render(meta);
        Main.render(meta);

    });


  
});
