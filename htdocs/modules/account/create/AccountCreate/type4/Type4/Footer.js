

KISP.panel('/AccountCreate/Type4/Footer', function (require, module, panel) {


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="create"]': function () {
                panel.fire('create');
            },
        });
    });



    panel.on('render', function () {
    });

    return {}
});





