/*
* babel time: 2020-10-19 16:41:37
*
* source md5: A6010BD239CD619B691A2552E3854AB6
*
* source file: htdocs/views/master/account/baks/AccountBaks/auto/Auto/List/Remark.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/AccountBaks/Auto/List/Remark', function (require, module, exports) {

    return {
        process: function process(str) {
            if (!str) {
                return '';
            }

            var remark = '';
            var remarkNum = str.length / 24;

            if (str && str.length > 24) {
                for (var i = 0; i < remarkNum; i++) {
                    remark = remark + str.slice(i * 24, (i + 1) * 24) + '&#10;';
                }
                if (str.length % 24 > 0) {
                    remark = remark + str.slice(remarkNum * 24, str.length);
                }
            } else {
                remark = str;
            }

            return remark;
        }
    };
});