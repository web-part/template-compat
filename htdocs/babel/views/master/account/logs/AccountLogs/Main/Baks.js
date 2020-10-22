/*
* babel time: 2020-10-19 16:41:37
*
* source md5: 558E12396D6FFA60850559E86D03B8C8
*
* source file: htdocs/views/master/account/logs/AccountLogs/Main/Baks.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountLogs/Main/Baks', function (require, module, panel) {

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