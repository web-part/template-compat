/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 5DC7AEB521FDF3E5BDEDF08900FDDCA9
*
* source file: htdocs/views/master/company/list/Companys/Register.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* ----暂时作废。
*/
KISP.panel('/Companys/Register', function (require, module, panel) {

    var Redirect = require('Redirect');

    var API = module.require('API');

    panel.on('init', function () {

        API.on({
            'success': function success(url) {
                Redirect.set(module.id, url);
            }
        });
    });

    panel.on('render', function () {
        //先清空，避免使用到上次关闭前的值。
        Redirect.reset(module.id);

        API.get();
    });
});