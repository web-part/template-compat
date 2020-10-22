
define('/Products/Main/List/Delete', function (require, module, exports) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');


  


    return {

        /**
        * 判断是否允许删除。
        */
        check: function (item) {
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

        },



    };


});