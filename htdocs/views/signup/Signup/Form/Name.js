
/**
* 
*/
KISP.panel('/Signup/Form/Name', function (require, module, panel) {
    var KISP = require('KISP');




    panel.on('init', function () {
        var toast = KISP.create('Toast', {
            duration: 1500,
            mask: 0,
            icon: 'close',
            width: 188,
        });


        function checkValid(value) {
            var len = value.length;
            var reg = /[^\a-z\A-Z\u4E00-\u9FA5]/g;

            if (reg.test(value)) {
                toast.show('名字需为中文或英文字母');
                return false;
            }

            return true;
        }



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