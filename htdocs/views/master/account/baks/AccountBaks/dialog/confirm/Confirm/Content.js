

KISP.panel('/AccountBaks/Confirm/Content', function (require, module, panel) {


    panel.on('init', function () {


    });



    panel.on('render', function (data) {

        panel.fill({
            'action': data.action,
            'name': data.name,
        });

    });



});






