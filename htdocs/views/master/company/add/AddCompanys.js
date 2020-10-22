
/*
* 
*/
KISP.view('/AddCompanys', function (require, module, view) {
    var Content = module.require('Content');
    var Header = module.require('Header');


    view.on('init', function () {


        Content.on({
            //注册企业。
            'register': function () {
                view.fire('register');
            },
        });


        Header.on({
            'ok': function () {
                var list = Content.get();
                Header.postData(list);

            },
            'company-list': function () {
                view.fire('to-companys');
            },
            'search': function (keyword) { 
                Content.render(keyword);
            },
            //注册企业。
            'register': function () {
                view.fire('register');
            },
            'add-success': function () {
                view.fire('add-success');
            },
        });

    });


    view.on('render', function (data) {
        Content.render();
        Header.render();

    });

});





