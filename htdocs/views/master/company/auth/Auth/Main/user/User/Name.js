
/*
* 联系人姓名。
*/
KISP.panel('/Auth/Main/User/Name', function (require, module, panel) {
    var KISP = require('KISP');
    var Flash = require('Flash');

    var toast = null;


    panel.on('init', function () {

        toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 150,
        });

        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    //toast.show('请填写联系人姓名');
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

            if (value) {
                return value;
            }

            return function () {
                toast.show('请填写联系人姓名');
                txt.focus();
                Flash.start(panel.$, 'warning');

            };
        },
    };


});





