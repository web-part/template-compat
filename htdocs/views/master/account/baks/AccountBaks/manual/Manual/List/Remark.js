

define('/AccountBaks/Manual/List/Remark', function (require, module, exports) {
    


    return {
        process: function (str) {
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

            }
            else {
                remark = str;
            }

            return remark;
        },
    };




});