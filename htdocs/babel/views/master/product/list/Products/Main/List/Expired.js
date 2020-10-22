/*
* babel time: 2020-10-19 16:41:38
*
* source md5: DAD7E84655DC053956682EB69B838BD0
*
* source file: htdocs/views/master/product/list/Products/Main/List/Expired.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Products/Main/List/Expired', function (require, module, exports) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');

    return {

        /**
        * 产品到期时间小于30天时标红显示。
        */
        getClass: function getClass(date) {
            if (!date || date == '0000-00-00') {
                return '';
            }

            date = $Date.parse(date);

            var now = Date.now();
            var dd = date - now;

            //已过期。
            if (dd < 0) {
                return 'warning';
            }

            dd = dd / (24 * 3600 * 1000);
            dd = Math.floor(dd);

            //即将过期。
            if (dd < 30) {
                return 'notice';
            }

            return '';
        }

    };
});