
/**
* 
*/
KISP.panel('/CompanyBind/Footer', function (require, module, panel) {

    panel.on('init', function () {
        panel.template().fix('disabled');


        panel.$on('click', {
            '[data-cmd]': function (event) {
                var cmd = this.getAttribute('data-cmd');
                event.preventDefault();

                panel.fire(cmd);
            },
        });
    });




    panel.on('render', function (valid) {

        panel.fill({
            'disabled': valid ? '' : 'disabled',
        });

    });


});