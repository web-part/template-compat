/*
* babel time: 2020-10-19 16:42:31
*
* source md5: EC0A7045246A160159974B547999DB46
*
* source file: htdocs/lib/User.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('User', function (require, module, exports) {
    var $ = require('$');

    var is_new = '';
    return {
        get: function get() {
            return is_new;
        },
        set: function set(data) {
            is_new = data.is_new;
        }
    };
});