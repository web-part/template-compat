
/*
* 
*/
KISP.panel('/AccountLogs/Main', function (require, module, panel) {
    

    var Tabs = module.require('Tabs');

    var Accounts = module.require('Accounts');
    var Baks = module.require('Baks');


    var meta = {
        company: null,
    };


    panel.on('init', function () {


        Tabs.on({
            'accounts': function () {
                Accounts.render(meta);
                Baks.hide();
            },
            'baks': function () {
                Accounts.hide();
                Baks.render(meta);
            },
        });

    

    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *   };
    */
    panel.on('render', function (data) {

        meta.company = data.company;

        Tabs.render(0);
    });



});





