
/*
* 统一社会信用代码。
*/
KISP.panel('/Auth/Main/Auth/License/Type0/Code', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;


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
                    //toast.show('请填写统一社会信用代码');
                    return;
                }

                if (!isValidLen) {
                    toast.show('统一社会信用代码的长度必须为15位或18位');
                    Flash.start(panel.$, 'warning');
                    return;
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
                    toast.show('请填写统一社会信用代码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            if (!isValidLen) {
                return function () {
                    toast.show('统一社会信用代码的长度必须为15位或18位');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }

            return value;
        },
        setCode: function (data) { 
            panel.$.find('input').val(data);
        }
    };

});





