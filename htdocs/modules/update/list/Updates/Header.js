
/*
* 
*/
KISP.panel('/Updates/Header', function (require, module, panel) {
    var KISP = require('KISP');




    panel.on('init', function () {
        //关闭按钮。
        panel.$on('click', {
            '[data-cmd]': function (event) {
                var cmd = this.getAttribute('data-cmd');

                panel.fire(cmd);
            },
        });
        
    });

   



    panel.on('render', function () {

    });


    return {
       
    };


});



