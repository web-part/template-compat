
/*
* 
*/
KISP.panel('/Exp/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var plugin = KISP.data('plugin');

    var User = require('User');

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var cmd = this.getAttribute('data-cmd');
                panel.fire(cmd);
            },
        });

        panel.$on('click', {
            '[data-type="delete-tip"]': function () {
                panel.$.find('[data-type="download"]').removeClass('on');
            }
        });
    });


    panel.on('render', function () {


        panel.fill({
            'plugin': plugin.url,
        });

    });

    return {
        // setList: function (list) { 
        //     if (list.length) { 
        //         panel.$.find('[data-type="download"]').removeClass('hide');
        //         return;
        //     }
        //     panel.$.find('[data-type="download"]').addClass('hide');
        // }
    }

});





