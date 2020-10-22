

KISP.panel('/AccountBaks/VCode/Footer', function (require, module, panel) {




    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },

        });

    });


    panel.on('render', function (action) {
        panel.fill({
            'action': action,
        });
    });


});





