/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 64B56C6C3059D961B6536893B5F4DA69
*
* source file: htdocs/lib/droplist/DropList/Field.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('DropList/Field', function (require, module, exports) {
    var KISP = require('KISP');
    var $ = require('$');

    function getValue(item, key) {
        return typeof key == 'function' ? key(item) : item[key];
    }

    return {
        map: function map(field, list) {
            list = list || [];

            if (!field) {
                return list;
            }

            list = list.map(function (item) {

                var id = field.id ? getValue(item, field.id) : '';
                var title = field.title ? getValue(item, field.title) : '';

                return {
                    'id': id,
                    'title': title,
                    'item': item,
                    'disabled': false
                };
            });

            return list;
        }

    };
});