
/**
* 
*/
KISP.panel('/CompanyRegister/Name', function (require, module, panel) {
    var KISP = require('KISP');



    panel.on('init', function () {
        function check(txt) {
            var value = txt.value;

            //实时去掉空格。
            if (value.includes(' ')) {
                value = txt.value = value.split(' ').join('');
            }

            return value || '';

            //var regexp = /[^\a-z\A-Z\u4E00-\u9FA5]/g;   //有数字不行。
            //var invalid = regexp.test(value);

            //return invalid ? '' : value;
        }

      



        panel.$bind('input', {
            'input': function (event) {
                var value = check(this);


                panel.fire('change', [value]);

            },
        });


    });




    panel.on('render', function () {

        panel.fill({}); //清空上次留下的。

    });



});