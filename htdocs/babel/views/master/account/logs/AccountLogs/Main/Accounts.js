/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 3CEB4DC484AC6EB19142F7E8A7D76DCC
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main/Accounts.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountLogs/Main/Accounts', function (require, module, panel) {
    var API = module.require('API');
    var List = module.require('List');

    panel.on('init', function () {

        API.on('success', {
            'get': function get(list) {
                List.render(list);
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

        API.get(data);
    });
});