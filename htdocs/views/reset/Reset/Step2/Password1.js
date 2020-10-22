
/**
* 
*/
KISP.panel('/Reset/Step2/Password1', function (require, module, panel) {
    var KISP = require('KISP');
    


    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: '',
            width: 185,
        });


        function checkValid(value) {
            var len = value.length;

            if (len < 6 || len > 20) {
                return;
            }

            if (!(/([a-z]|[A-Z])+/).test(value)) {
                return;
            }

            if (!(/\d+/).test(value)) {
                return;
            }

            return true;
        }


        panel.$on('blur', {
            'input': function () {
                var txt = this;
                var value = txt.value;

                if (!value) {
                    return;
                }

                var valid = checkValid(value);

                if (!valid) {
                    toast.show('密码长度为 6~20 位，需要包含字母和数字。');
                    return;
                }
            },

        });

        panel.$on('input', {
            'input': function (event) {
                var value = this.value;
                var valid = checkValid(value);
                panel.fire('change', [valid, value]);
            },
        });
     
    });




    panel.on('render', function () {

        panel.fill({}); //清空上次留下的。

    });



});