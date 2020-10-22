
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
        get: function (form) {
            var base = Base.get(form.base);
            var user = User.get(form.user);
            var auth = Auth.get(form.auth);

            var form = Object.assign({}, base, user, auth);

            return form;

        },

    };


});