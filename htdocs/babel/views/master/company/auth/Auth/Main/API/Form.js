/*
* babel time: 2020-10-19 16:41:38
*
* source md5: AF0CF4F49AD4236AC0C2D7B27625EA7A
*
* source file: htdocs/views/master/company/auth/Auth/Main/API/Form.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
define('/Auth/Main/API/Form', function (require, module, exports) {
    var KISP = require('KISP');
    var $Object = KISP.require('Object');

    var Base = module.require('Base');
    var User = module.require('User');
    var Auth = module.require('Auth');

    return {
        get: function get(form) {
            var base = Base.get(form.base);
            var user = User.get(form.user);
            var auth = Auth.get(form.auth);

            var form = Object.assign({}, base, user, auth);

            return form;
        }

    };
});