
/*
* 某个账套下的用户列表。
*/
KISP.view('/AccountUsers', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Selector = module.require('Selector');



    var meta = {
        company: null,
        product: null,
        account: null,
        list:  [],
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

            //跳到账套列表。
            'account-list': function () {
                view.fire('account-list', [{
                    'company': meta.company,
                    'product': meta.product,
                }]);
            },

            //刷新。
            'refresh': function () {
                Main.render(meta);
            },

            
        });
        

        Main.on({
            'selector': function () {
                Selector.render(meta);
            },
            'render': function (list) {
                meta.list = list;
            },
        });

        Selector.on({
            'ok': function () {
                Main.render(meta);
            },
        });

    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *       account: {},    //账套信息。
    *   };
    */
    view.on('render', function (data) {
        meta = data;

        Header.render(data);
        Main.render(data);

    });



});





