
/*
* 
*/
KISP.panel('/AccountBaks/Private/Header', function (require, module, panel) {



    panel.on('init', function () {


    });

    panel.on('render', function (data) {
        panel.$.find('[data-cmd="progress"]').css('display', 'block');
        panel.fill({
            'used': data && data.used || '0.0G',
            'total': data && data.total || '0.0G',
        });

        panel.$.find('[data-cmd="bar-num"]').width(data.rate);
    });




    return {

    };


});



