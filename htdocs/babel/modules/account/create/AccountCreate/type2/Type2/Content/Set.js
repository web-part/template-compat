/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 4C9A0912A82E843A01425CF867179CF5
*
* source file: htdocs/modules/account/create/AccountCreate/type2/Type2/Content/Set.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 科目体系。
*/
KISP.panel('/AccountCreate/Type2/Content/Set', function (require, module, panel) {

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
            var item = List.get();

            return {
                'acct_group': item.value
            };
        }
    };
});