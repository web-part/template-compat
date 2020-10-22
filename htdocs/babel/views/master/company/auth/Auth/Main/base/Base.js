/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 4A2D9EB3A7F6FA2A6E9F5C6EB555F406
*
* source file: htdocs/views/master/company/auth/Auth/Main/base/Base.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
* 基础信息。
*/
KISP.panel('/Auth/Main/Base', function (require, module, panel) {

    var Company = module.require('Company'); //企业名称。
    var Industry = module.require('Industry'); //所属行业。
    var Address = module.require('Address'); //企业地址。
    var Scale = module.require('Scale'); //企业规模。


    panel.on('init', function () {
        Company.on({
            'set-code': function setCode(data) {
                panel.fire('set-code', [data]);
            }
        });
    });

    panel.on('render', function (company) {
        Company.render(company);
        Industry.render();
        Address.render();
        Scale.render();
    });

    return {
        get: function get() {
            var company = Company.get();
            var industry = Industry.get();
            var address = Address.get();
            var scale = Scale.get();

            return [{ key: 'company', value: company }, { key: 'industry', value: industry }].concat(_toConsumableArray(address), [{ key: 'scale', value: scale }]);
        }
    };
});