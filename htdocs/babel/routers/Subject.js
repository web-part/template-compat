/*
* babel time: 2020-10-19 16:42:32
*
* source md5: F9A18EA90B1DD4F2E27593E88B2CFE19
*
* source file: htdocs/routers/Subject.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Subject', function (require, module) {

    var AccountPlugin = require('AccountPlugin');

    return {

        /**
        * 点击了产品信息，打开对应的账套。
        *   data = {
        *       tid: '',        //必选，企业 id。
        *       acctid: '',     //必选，账套 id。
        *   };
        */
        'product': function product(data) {
            AccountPlugin.open(data);
        },

        /**
        * 打开第三方应用。
        *
        */
        'url': function url(_url) {
            //location.href = url;
            window.open(_url); //打开新窗口，可能会给浏览器拦截。
        }

    };
});