

KISP.panel('/Login/Main/Banner', function (require, module, panel) {
    var KISP = require('KISP');
    var env = KISP.data('env');

    panel.on('init', function () {
        // panel.$on('click', {
        //     '[data-cmd]': function (event) {
        //         var cmd = this.getAttribute('data-cmd');
        //         debugger;
        //         panel.fire('cmd', [cmd]);
        //     },

        // });

    });





    panel.on('render', function () {
        panel.fill({
            'show': env.name == 'public' ? 'on' : '',
            'try-icon': env.name == 'official' ? 'on' : '',
            'normal-icon': env.name == 'public' ? 'on' : '',
            'help': env.data.help,
        });

    });




    return {

    };




});