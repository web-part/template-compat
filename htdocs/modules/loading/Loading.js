

KISP.panel('/Loading', function (require, module, panel) {
    var KISP = require('KISP');
    var $String = KISP.require('String');


    panel.set('visible', true);



    panel.on('hide', function () {
        panel.fire('hide');
    });



});