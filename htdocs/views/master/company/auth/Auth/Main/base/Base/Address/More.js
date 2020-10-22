
/*
* 
*/
KISP.panel('/Auth/Main/Base/Address/More', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');
    var toast = null;


    panel.on('init', function () {
        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 200,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写企业地址');
                    return;
                }

                if (value.length < 5) {
                    toast.show('企业地址不能少于5个字符');
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
                    toast.show('请填写企业地址');
                    txt.focus();
                    Flash.start(panel.$, 'warning');

                };
            }

            if (value.length < 5) {
                return function () {
                    toast.show('企业地址不能少于5个字符');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };

            }
            return value;
        },
    };
});
