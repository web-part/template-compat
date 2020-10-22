/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 98C5A03FDE01DAFDDBA008622718BA1B
*
* source file: htdocs/modules/account/create/AccountCreate/type1/Type1/Content/Period/Result.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/AccountCreate/Type1/Content/Period/Result', function (require, module, panel) {

    var KISP = require('KISP');
    var $String = KISP.require('String');

    var meta = {
        year: '',
        month: ''
    };

    /**
    * 初始化时触发。
    * 即首次 render 之前触发，且仅触发一次。
    * 适用于创建实例、绑定事件等只需要执行一次的操作。
    */
    panel.on('init', function () {});

    /**
    *   data = {
    *       year: '',
    *       month: '',
    *   };
    */
    panel.on('render', function (data) {
        meta = data;
        panel.fill(data);
    });

    return {
        get: function get() {

            var value = $String.format('{year}-{month}-01', meta);

            return value;
        }
    };
});