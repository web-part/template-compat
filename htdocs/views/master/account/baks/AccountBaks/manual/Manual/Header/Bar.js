
/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header/Bar', function (require, module, panel) {

    var $ = require('$');

    panel.on('init', function () {

    });


    panel.on('render', function (data) {
        panel.fill({
            'used': data && data.used || '0.0G',
            'total': data && data.total || '0.0G',
        });
      
        panel.$.find('[data-cmd="bar-num"]').width(data.rate);
    });



    return {

    };


});



