
/*
* 
*/
KISP.panel('/Header/Logo', function (require, module, panel) {
    var KISP = require('KISP');




    panel.on('init', function () {

        panel.$on('click',  {
            '[data-cmd]': function (event) {
                var cmd = this.getAttribute('data-cmd');
                panel.fire('cmd', [cmd]);
            },

        });
    });



    panel.on('render', function () {


      


    });



});





