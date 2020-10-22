
/*
* 注册企业。
*/
KISP.view('/Register', function (require, module, view) {
    var API = module.require('API');
    var Header = module.require('Header');
    var Types = module.require('Types');
    var Form = module.require('Form');


    var meta = {
        type: '',
    };

    view.on('init', function () {

        Header.on({
            //跳回到企业列表。
            'company-list': function () {
                view.fire('company-list');
            },
        });


        Types.on({
            'change': function (item) {
                meta.type = item.value;
                Form.show();
            },
        });

        Form.on({
            'submit': function (name) {
                API.post({
                    'type': meta.type,
                    'name': name,
                });
            },
        });

        API.on({
            //注册企业成功，跳回企业列表页。
            'success': function () {
                view.fire('addcompany-list');
            },
        });
    
    });


    view.on('render', function () {
        meta.type = '';

        Header.render();
        Types.render();
        Form.render();

    });



});





