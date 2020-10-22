
/*
* CDKEY。
*/
KISP.panel('/Products/Active/Content/Cdkey', function (require, module, panel) {
    var KISP = require('KISP');



    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });


        panel.$on('blur', {
            '[name="cdkey"]': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;

                if (len && len != 4) {
                    toast.show('CDKEY 非法', function () {
                        txt.focus();
                    });
                }
            },
        });

        panel.$on('paste', {
            '[name="cdkey"]': function (e) {

                var value;
                var len;
                var cdk = [];

                panel.fill({});
                
                if (window.clipboardData && window.clipboardData.getData) { // IE
                    value = window.clipboardData.getData('Text');
                } else {
                    value = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
                }

                value = value.replace(/-/g, '');
                len = value.length;

                for (var i = 0; i < len / 4; i++) {
                    cdk.push(value.substring(4 * i, 4 * (i + 1)));
                }

                var domList = panel.$.find('[name="cdkey"]');
                var num = Math.min(domList.length, cdk.length);

                for (var j = 0; j < domList.length; j++) {
                    domList.get(j).value = cdk[j];
                }

            },
        });


        panel.$on('input', {
            '[name="cdkey"]': function () {
                if (this.value.length != 4) {
                    return;
                }

                //输满当前格，自动移焦到下一格。
                var index = +this.getAttribute('data-index');

                if (index < 3) {
                    panel.$.find('[name="cdkey"]').get(index + 1).focus();
                }

            },
        });


    });


    panel.on('render', function () {

        //清空上次可能留下的内容。
        panel.fill({});
    });




    return {
        get: function () {
            var cdkey = panel.$.find('[name="cdkey"]').toArray();

            cdkey = cdkey.map(function (item) {
                return item.value;
            });

            cdkey = cdkey.join('-');


            if (cdkey.length != 19) {
                KISP.alert('输入的 CDKEY 非法，请修正');
                return false;
            }

            return cdkey;

        },
    };


});





