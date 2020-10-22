
/*
* 认证企业。
*/
KISP.view('/Auth', function (require, module, view) {
    
    var Header = module.require('Header');
    var Main = module.require('Main');





    view.on('init', function () {
        Header.on({
            //跳到根节点，即我的企业，不需要传数据。
            'company-list': function () {
                view.fire('company-list');
            },
        });

        Main.on({
            'submit': function () {
                view.fire('company-list');
            },
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





