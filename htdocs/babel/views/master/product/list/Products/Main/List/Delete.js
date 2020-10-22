/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 67490EDF72171284BBEA6BB64B757CA0
*
* source file: htdocs/views/master/product/list/Products/Main/List/Delete.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

define('/Products/Main/List/Delete', function (require, module, exports) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');

    return {

        /**
        * 判断是否允许删除。
        */
        check: function check(item) {
            var origin = item.origin;
            var status = item.status;
            var count1 = item.count1;
            var type = item.type;

            if (type == 1) {
                return false;
            }

            //不允许删除。
            if (origin['can_del'] == 0) {
                return false;
            }

            if (status == 0) {
                return true;
            }

            if (status == 1 && count1 == 0) {
                return true;
            }

            if (status == 2 && count1 == 0 && type == 2) {
                return true;
            }

            return false;
        }

    };
});