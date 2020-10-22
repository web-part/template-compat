/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 46027E3C04CC74FCEEB733887E9BC7DE
*
* source file: htdocs/views/master/company/list/Companys/Auth.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 认证企业。
*/
KISP.panel('/Companys/Auth', function (require, module, panel) {

    var Redirect = require('Redirect');

    var API = module.require('API');

    var meta = {
        company: null
    };

    panel.on('init', function () {

        API.on({
            'success': function success(url) {
                panel.fire('success', [{
                    'company': meta.company,
                    'url': url
                }]);
            }
        });
    });

    panel.on('render', function (company) {
        var id = company.origin['tid'];

        meta.company = company;
        API.get(id);
    });
});