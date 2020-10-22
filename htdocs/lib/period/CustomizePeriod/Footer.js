
/*
* 
*/
KISP.panel('CustomizePeriod/Footer', function (require, module, panel) {
    var KISP = require('KISP');

    panel.on('init', function () {

        panel.$.on('click', '[data-cmd]', function () {
            var cmd = this.getAttribute('data-cmd');
            panel.fire(cmd);
        })

    });



    panel.on('render', function (data) {

    });



});





