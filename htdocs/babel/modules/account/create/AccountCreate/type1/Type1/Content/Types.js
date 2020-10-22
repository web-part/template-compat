/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 9ED36FAC0635334F29F10F07C9040B29
*
* source file: htdocs/modules/account/create/AccountCreate/type1/Type1/Content/Types.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 核算方式。
*/
KISP.panel('/AccountCreate/Type1/Content/Types', function (require, module, panel) {

    var List = module.require('List');

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {});

    panel.on('render', function () {
        List.render();
    });

    return {
        get: function get() {
            var list = List.get();
            var data = {};

            list.forEach(function (item) {
                data[item.key] = item.value;
            });

            return data;
        }
    };
});