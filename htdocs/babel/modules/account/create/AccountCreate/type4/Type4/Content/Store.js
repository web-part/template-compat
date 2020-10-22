/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 1324CBBDC5AA3158A34BDDB300445ECF
*
* source file: htdocs/modules/account/create/AccountCreate/type4/Type4/Content/Store.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 第一步中的表单。
*/
KISP.panel('/AccountCreate/Type4/Content/Store', function (require, module, panel) {

    var KISP = require('KISP');

    var toast = null;
    var checked = true;
    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {
        toast = KISP.create('Toast', {
            icon: 'close',
            duration: 1500
        });
    });

    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check-box"]': function dataCmdCheckBox() {
                checked = !checked;

                $(this).toggleClass('on', checked);
            }
        });
    });

    panel.on('render', function (data) {});

    return {
        get: function get() {
            var store = checked ? 1 : 0;
            return {
                muti_stock_calculate: store
            };
        }
    };
});