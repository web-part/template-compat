
/*
* 
*/
KISP.panel('/Accounts/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var plugin = KISP.data('plugin');

    var User = require('User');


    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd]': function () {
                var forbidden = $(this).hasClass('forbid');
                if (forbidden) {
                    return;
                }

                var cmd = this.getAttribute('data-cmd');
                if (cmd == 'create-account') {
                    panel.$.find('[data-type="create-account"]').removeClass('on');
                }

                panel.fire(cmd);
            },


            '[data-type="delete-tip"]': function () {
                panel.$.find('[data-type="download"]').removeClass('on');
            },
        });

      

    });


    panel.on('render', function (data) {

        panel.fill({
            'company': data.company.name,
            'product': data.product.name,
            'plugin': plugin.url,
        });

    });

    return {

    };

});





