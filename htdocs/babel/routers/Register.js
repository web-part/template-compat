/*
* babel time: 2020-10-19 16:42:32
*
* source md5: A08EB5EB8D8435FC57DB630F69E3537A
*
* source file: htdocs/routers/Register.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('Register', function (require, module) {

    return {
        'addcompany-list': function addcompanyList() {
            var Master = module.require('Master');
            Master.open('AddCompanys', []);
        }

    };
});