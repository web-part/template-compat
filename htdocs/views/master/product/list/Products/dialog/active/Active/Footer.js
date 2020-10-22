

KISP.panel('/Products/Active/Footer', function (require, module, panel) {


    panel.on('init', function () {
       
        panel.$.on('click', 'button', function () {

            panel.fire('submit');
        });

    });



    panel.on('render', function () {

    });


});





