/*
* babel time: 2020-10-19 16:42:31
*
* source md5: BA840A0A34F18287CBA8EDB7605B7B69
*
* source file: htdocs/lib/pager/Pager/Sizes.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

define('Pager/Sizes', function (require, module) {

    return {

        get: function get(sizes, size) {
            size = size || sizes[0];
            sizes = [size].concat(_toConsumableArray(sizes));
            sizes = [].concat(_toConsumableArray(new Set(sizes)));

            sizes.sort(function (x, y) {
                return x > y ? 1 : -1;
            });

            return sizes;
        }

    };
});