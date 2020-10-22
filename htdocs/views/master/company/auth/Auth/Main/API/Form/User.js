
/**
* 
*/
define('/Auth/Main/API/Form/User', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var key$process = {
        //联系人姓名。
        'name': function (value) {
            return { 'linkman': value, };
        },
        //联系人手机号码。
        'phone': function (value) {
            return { 'linkphone': value, };
        },
        //联系人手机验证码。
        'code': function (value) {
            return { 'vcode': value, };
        },
        //联系人邮箱。
        'email': function (value) {
            return { 'linkemail': value, };
        },
    };

    return {
        get: function (list) {
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
        },

    };


});