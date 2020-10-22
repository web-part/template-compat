
define('User', function (require, module, exports) {
    var $ = require('$');
    
    var is_new='';
    return {
        get: function () {
            return is_new;
        },
        set: function (data) { 
            is_new = data.is_new;
        }
    };
});


 