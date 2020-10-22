
/*
* 负责人身份证号码
*/
KISP.panel('/Auth/Main/Auth/License/Type2/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;
    var regexp15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
    var regexp18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 185,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;
                var isValidLen = len == 15 || len == 18;

                if (!value) {
                    //toast.show('请填写身份证号码');
                    return;
                }

                if (!isValidLen) {
                    toast.show('身份证号码的长度必须为15位或18位');
                    Flash.start(panel.$, 'warning');
                    return;
                }

                if (len == 15 && !regexp15.test(value)) {
                    toast.show('15位的身份证号码格式不正确');
                    Flash.start(panel.$, 'warning');
                    return;
                }

                if (len == 18 && !regexp18.test(value)) {
                    toast.show('18位的身份证号码格式不正确');
                    Flash.start(panel.$, 'warning');
                    return
                }

            },

        });
    });

    panel.on('render', function () {
        

    });



    return {
        reset: function () {
            panel.fill({});
        },

        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;
            var len = value.length;
            var isValidLen = len == 15 || len == 18;

            if (!value) {
                return function () {
                    toast.show('请填写身份证号码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (!isValidLen) {
                return function () {
                    toast.show('身份证号码的长度必须为15位或18位');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (len == 15 && !regexp15.test(value)) {
                return function () {
                    toast.show('15位的身份证号码格式不正确');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (len == 18 && !regexp18.test(value)) {
                return function () {
                    toast.show('18位的身份证号码格式不正确');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }


            return value;
        },


    };

});





