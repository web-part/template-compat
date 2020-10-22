
/*
* ----暂时作废。
*/
KISP.panel('/Companys/Register', function (require, module, panel) {
    
    var Redirect = require('Redirect');

    var API = module.require('API');


    panel.on('init', function () {

        API.on({
            'success': function (url) {
                Redirect.set(module.id, url);
            },
        });
       

    });


    panel.on('render', function () {
        //先清空，避免使用到上次关闭前的值。
        Redirect.reset(module.id);

        API.get();
    });



});





