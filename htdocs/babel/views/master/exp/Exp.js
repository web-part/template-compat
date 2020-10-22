/*
* babel time: 2020-10-19 16:42:32
*
* source md5: D8DC453F9C92786BDA0BF423CE122393
*
* source file: htdocs/views/master/exp/Exp.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 我的账套。
*/
KISP.view('/Exp', function (require, module, view) {

    var Main = module.require('Main');
    var Header = module.require('Header');

    view.on('init', function () {});

    view.on('render', function () {
        Header.render();
        Main.render();
    });
});