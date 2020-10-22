
/**
* 大小写开关检查。
*/
KISP.panel('/Login/Main/Form/CapsLock', function (require, module, panel) {
    var KISP = require('KISP');

    var isOff = true; //假设是关闭的。 这个逻辑不是很严谨，只适用于进来页面之前，大小写开关是关闭状态的。


    panel.set('show', false);

    panel.on('init', function () {
        $(document.body).on({
            'keydown': function (event) {
                var keyCode = event.originalEvent.keyCode;

                if (keyCode == 20) {
                    isOff = !isOff;
                }

                panel.toggle(!isOff);
            },
        });
    });



    panel.on('render', function () {
        
    });




    return {
       

    };

   



});