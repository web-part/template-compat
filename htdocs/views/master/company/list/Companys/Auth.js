
/*
* 认证企业。
*/
KISP.panel('/Companys/Auth', function (require, module, panel) {
    
    var Redirect = require('Redirect');

    var API = module.require('API');

    var meta = {
        company: null,
    };


    panel.on('init', function () {

        API.on({
            'success': function (url) {
                panel.fire('success', [{
                    'company': meta.company,
                    'url': url,
                }]);
            },
        });
       

    });


    panel.on('render', function (company) {
        var id = company.origin['tid'];

        meta.company = company;
        API.get(id);
    });



});





