
/*
* 某个账套下的用户列表。
*/
KISP.view('/ApplicationUsers', function (require, module, view) {

    var Header = module.require('Header');
    var Main = module.require('Main');
    var Selector = module.require('Selector');



    var meta = {
        company: null,
        product: null,
        application:null,
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

            //跳到应用列表。
            'application-list': function () {
                
                view.fire('application-list', [{
                    'company': meta.company,
                    'product': meta.product,
                }]);
            },

            //刷新。
            'refresh': function () {
                Header.render(meta);
                Main.render(meta);
            },

             //添加应用。
             'add-users': function () {
                Selector.render(meta);
            },

            
        });
        

        Main.on({
            'selector': function () {
                Selector.render(meta);
            },
            'render': function (list) {
                meta.list = list;   //用于添加用户时 已存在的账套用户列表。
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
    *       application: {},    //账套信息。
    *   };
    */
    view.on('render', function (data) {
        meta.company = data.company;
        meta.product = data.product;
        meta.application = data.application;
        Header.render(meta);
        Main.render(meta);

    });



});





