

KISP.panel('/Products/Detail/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
        panel.$.on('click', 'button', function () {

            panel.fire('ok');
        });

    });



    panel.on('render', function () {

    });


});





