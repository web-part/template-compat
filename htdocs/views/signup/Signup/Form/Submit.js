
/**
* 
*/
KISP.panel('/Signup/Form/Submit', function (require, module, panel) {

    panel.on('init', function () {

        panel.$on('click', {
            'button': function (event) {
                event.preventDefault();
                panel.fire('submit');
            },
        });
    });




    panel.on('render', function (form) {

        console.log(form);

        var valid =
            form &&
            form.phone &&
            form.name &&
            form.code &&
            form.password &&
            form.agreed;


        panel.fill({
            'disabled': valid ? '' : 'disabled',
        });
    });

});