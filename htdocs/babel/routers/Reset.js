/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 305D30244CF83B851705029F9A83A352
*
* source file: htdocs/routers/Reset.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Reset', function (require, module) {

    return {
        'render': function render() {},

        /**
        * 转到登录视图。
        *   data = {
        *       phone: '',      //可选，手机号。
        *       third: {},      //可选，第三方包。
        *   };
        */
        'login': function login(data) {
            var Navigator = module.require('Navigator');

            Navigator.to('Login', [data]);
        }
    };
});