
/*
* 某个产品下的在线用户列表。
*/
KISP.view('/ProductUsers', function (require, module, view) {
    var Header = module.require('Header');
    var Main = module.require('Main');



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

            //刷新。
            'refresh': function () {
                Main.refresh();
            },

            
        });
       

    });


    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    view.on('render', function (data) {
      
        meta = data;

        Header.render(data);
        Main.render(data);

    });



});





