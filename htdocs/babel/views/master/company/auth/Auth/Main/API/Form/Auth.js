/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 578E2F3DD32EF02EAF92F8A6AC35D07A
*
* source file: htdocs/views/master/company/auth/Auth/Main/API/Form/Auth.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
define('/Auth/Main/API/Form/Auth', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    return {
        get: function get(list) {
            var all = {};

            list.forEach(function (item) {
                var key = item.key;
                var value = item.value;

                if (typeof value == 'function') {
                    return;
                }

                all[key] = value;
            });

            var type = all['type'];

            if (!type) {
                return;
            }

            var form = function (type) {

                switch (type.id) {
                    case '1': //‘法人企业’
                    case '2':
                        //‘个体工商户’
                        return {
                            'license': all['code'] || '',
                            'license_pic': all['photo'] || ''
                        };

                    case '4':
                        //‘个人’
                        return {
                            'boss_name': all['name'] || '',
                            'boss_idno': all['code'] || '',
                            'boss_pic': all['photo'] || ''
                        };

                    case '3':
                        //‘其它’
                        return {
                            'org_code': all['code'] || '',
                            'org_code_pic': all['photo'] || ''
                        };

                    default:
                        throw new Error('无法识别的企业类型 id');

                }
            }(type);

            Object.assign(form, {
                'type': type.id
            });

            return form;
        }
    };
});