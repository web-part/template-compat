/*
* babel time: 2020-10-19 16:41:38
*
* source md5: ABE159AB1387295A77DEA3FAD09BE597
*
* source file: htdocs/views/master/product/list/Products/dialog/active/Active/Content/Sn.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/*
* 序列号。
*/
KISP.panel('/Products/Active/Content/Sn', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close'
        });

        panel.$on('blur', {
            '[name="sn"]': function nameSn() {
                var txt = this;
                var value = txt.value;
                var len = value.length;

                if (len && len > 20) {
                    toast.show('序列号非法', function () {
                        txt.focus();
                    });
                }
            }
        });
    });

    panel.on('render', function () {

        //清空上次可能留下的内容。
        panel.fill({});
    });

    return {
        get: function get() {
            var sn = panel.$.find('[name="sn"]').val();

            if (!sn) {
                KISP.alert('输入序列号');
                return false;
            }

            return sn;
        }
    };
});