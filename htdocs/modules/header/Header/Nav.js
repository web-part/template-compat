
/*
* 
*/
KISP.panel('/Header/Nav', function (require, module, panel) {
    var KISP = require('KISP');




    panel.on('init', function () {

        panel.$on('click',  {
            '[data-cmd]': function (event) {
                var cmd = this.getAttribute('data-cmd');

                panel.fire('cmd', [cmd]);
            },

        });
    });



    panel.on('render', function (count, env) {


        panel.fill({
            'help': env.data.help,
            'plugin': env.data.plugin,
            'try-icon': env.name == 'official' ? 'show' : '',
            'normal-icon': env.name == 'public' ? 'show' : '',

            'message-display': count > 0 ? '' : 'display: none;',
            'message-count': count > 99 ? '99+' : count,

        });




    });



});





