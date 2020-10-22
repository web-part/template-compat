/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 028B0164100CAA8FF2DC750908DC8B81
*
* source file: htdocs/views/master/company/auth/Auth/Main/API/Form/User.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
define('/Auth/Main/API/Form/User', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var key$process = {
        //联系人姓名。
        'name': function name(value) {
            return { 'linkman': value };
        },
        //联系人手机号码。
        'phone': function phone(value) {
            return { 'linkphone': value };
        },
        //联系人手机验证码。
        'code': function code(value) {
            return { 'vcode': value };
        },
        //联系人邮箱。
        'email': function email(value) {
            return { 'linkemail': value };
        }
    };

    return {
        get: function get(list) {
            var form = {};

            list.forEach(function (item) {
                var value = item.value;

                if (typeof value == 'function') {
                    return;
                }

                var key = item.key;
                var process = key$process[key];
                var data = process ? process(value) : null;

                Object.assign(form, data);
            });

            return form;
        }

    };
});