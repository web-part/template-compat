
/*
* 手机验邮箱。
*/
KISP.panel('/Auth/Main/User/Email', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');


    var toast = null;
    var regexp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;


    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写邮箱');
                    return;
                }


                if (!regexp.test(value)) {
                    toast.show('邮箱非法');
                    Flash.start(panel.$, 'warning');
                    return;
                }

            },

        });

    });


    panel.on('render', function () {
        panel.fill({
         

        });
    });


    return {
        get: function () {
            var txt = panel.$.find('input').get(0);
            var value = txt.value;

            if (!value) {
                return function () {
                    toast.show('请填写邮箱');

                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (!regexp.test(value)) {
                return function () {
                    toast.show('邮箱非法');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }


            return value;
        },
    };


});





