/*
* babel time: 2020-10-19 16:41:37
*
* source md5: EE08FFEADF29A8447D868C6C5B27630B
*
* source file: htdocs/views/master/account/list/Accounts/dialog/apps/Apps/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

KISP.panel('/Accounts/Apps/Content', function (require, module, panel) {
    var KISP = require('KISP');
    var List = module.require('List');

    panel.on('init', function () {

        //应用列表。
        List.on('use', {
            'product': function product(item) {
                panel.fire('product');
            },

            'app': function app(item) {
                panel.fire('app', [item]);
            }
        });
    });

    /**
    * 渲染。
    */
    panel.on('render', function (data) {
        var list = [data.product].concat(_toConsumableArray(data.apps));

        List.render(list);
    });
});