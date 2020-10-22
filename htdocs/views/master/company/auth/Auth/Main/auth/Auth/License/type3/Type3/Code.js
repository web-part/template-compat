
/*
* 证件号码
*/
KISP.panel('/Auth/Main/Auth/License/Type3/Code', function (require, module, panel) {
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
                var len = value.length;

                if (!value) {
                    //toast.show('请填写证件号码');
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

            if (!value) {
                return function () {
                    toast.show('请填写证件号码');
                    txt.focus();
                    Flash.start(panel.$, 'warning');
                };
            }


            return value;
        },
       
    };

});





