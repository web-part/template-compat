/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 0379B56EA1D0389E110EDD40E13BC35E
*
* source file: htdocs/views/master/product/user/ProductUsers/Main.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 
*/
KISP.panel('/ProductUsers/Main', function (require, module, panel) {
    var KISP = require('KISP');
    var API = module.require('API');
    var List = module.require('List');
    var Search = module.require('Search');

    var meta = {
        company: null,
        product: null
    };

    panel.on('init', function () {

        Search.on({
            'submit': function submit(list, keyword) {
                List.render(list, keyword);
            }
        });

        List.on('cmd', {
            //踢除用户。
            'delete': function _delete(item) {
                KISP.confirm('\u786E\u8BA4\u6CE8\u9500\u5728\u7EBF\u7528\u6237\uFF1A' + item.name, function () {
                    API.delete(item);
                });
            }

        });

        API.on('success', {
            //获取用户列表成功。
            'get': function get(list) {
                Search.render(list);
                List.render(list);
            },

            //踢除用户成功。
            'delete': function _delete() {
                panel.refresh();
            }

        });
    });

    /**
    * 渲染。
    *   data = {
    *       company: {},    //企业信息。
    *       product: {},    //产品信息。
    *   };
    */
    panel.on('render', function (data) {
        meta = data;

        API.get(data);
    });
});