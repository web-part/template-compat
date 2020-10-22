/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 227B76CAA028E87392C99432D2AAA188
*
* source file: htdocs/lib/droplist/DropList/Filter.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//默认过滤器。

define('DropList/Filter', function (require, module, exports) {

    function find(item, keys, keyword) {
        var len = keys.length;

        for (var i = 0; i < len; i++) {
            var key = keys[i];
            var ignoreCase = false; //是否忽略大小写。

            // { name: '', ignoreCase: true }
            if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
                var opt = key;

                key = opt.name;
                ignoreCase = opt.ignoreCase;
            }

            var value = item[key];

            if (typeof value == 'number') {
                value = String(value);
            }

            //搜索下一个字段值。
            if (typeof value != 'string') {
                continue;
            }

            //指定了不区分大小写。
            if (ignoreCase) {
                value = value.toLowerCase();
                keyword = keyword.toLowerCase();
            }

            //已找到。
            if (value.includes(keyword)) {
                return true;
            }
        }

        //如果没找到，必须明确返回 false。
        return false;
    }

    return {
        bind: function bind(meta) {
            var filters = meta.filters;

            meta.this.on('change', function (keyword) {

                this.fill(meta.list, keyword, function (item, index) {

                    //不需要过滤时，则只高亮关键词。
                    if (!filters) {
                        return true;
                    }

                    return find(item, filters, keyword);
                });
            });
        }

    };
});