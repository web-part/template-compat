/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 6F0DD589D19785EF01B1B3E63EABEEEF
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/AccountLogs/Main', function (require, module, panel) {

    var Tabs = module.require('Tabs');

    var Accounts = module.require('Accounts');
    var Baks = module.require('Baks');

    var meta = {
        company: null
    };

    panel.on('init', function () {

        Tabs.on({
            'accounts': function accounts() {
                Accounts.render(meta);
                Baks.hide();
            },
            'baks': function baks() {
                Accounts.hide();
                Baks.render(meta);
            }
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