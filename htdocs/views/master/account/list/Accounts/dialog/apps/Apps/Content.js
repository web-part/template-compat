

KISP.panel('/Accounts/Apps/Content', function (require, module, panel) {
    var KISP = require('KISP');
    var List = module.require('List');



    panel.on('init', function () {



        //应用列表。
        List.on('use', {
            'product': function (item) {
                panel.fire('product');
            },

            'app': function (item) {
                panel.fire('app', [item]);
            },
        });







    });



    /**
    * 渲染。
    */
    panel.on('render', function (data) {
        var list = [data.product, ...data.apps];

        List.render(list);

    });
});






