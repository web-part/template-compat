/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 8DBB218C0405AB6B7BA610432FF330DF
*
* source file: htdocs/routers/AddCompanys.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.route('AddCompanys', function (require, module) {

    return {
        'to-companys': function toCompanys() {
            var Master = module.require('Master');
            Master.open('Companys');
        },
        'register': function register() {
            var Master = module.require('Master');
            Master.open('Register');
        },
        'add-success': function addSuccess() {
            var Master = module.require('Master');
            Master.open('Companys');
        }
    };
});