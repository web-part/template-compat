

KISP.panel('/Loading', function (require, module, panel) {

    panel.set('visible', true);



    panel.on('hide', function () {
        panel.fire('hide');
    });



});