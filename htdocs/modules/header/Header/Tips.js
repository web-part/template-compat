
/*
* 
*/
KISP.panel('/Header/Tips', function (require, module, panel) {
    var KISP = require('KISP');
    var $Date = KISP.require('Date');


    panel.on('init', function () {

    });



    panel.on('render', function (env) {
        var isTime = new Date() - $Date.parse('2019-02-28 23:59:59') <= 0;
        var name = env.name;

        panel.fill({
            'public-tips': name == 'public' ? 'on' : '',
            'official-tips': name == 'official' && isTime ? 'on' : '',
        });




    });



});





