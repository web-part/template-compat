
/*
* 序列号。
*/
KISP.panel('/Products/Active/Content/Sn', function (require, module, panel) {
    var KISP = require('KISP');


    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
        });

        panel.$on('blur', {
            '[name="sn"]': function () {
                var txt = this;
                var value = txt.value;
                var len = value.length;

                if (len && len > 20) {
                    toast.show('序列号非法', function () {
                        txt.focus();
                    });
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
            var sn = panel.$.find('[name="sn"]').val();

            if (!sn) {
                KISP.alert('输入序列号');
                return false;
            }


            return sn;

        },
    };


});





