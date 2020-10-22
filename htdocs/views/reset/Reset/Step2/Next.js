
/**
* 
*/
KISP.panel('/Reset/Step2/Next', function (require, module, panel) {

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
            form.password1 &&
            form.password2 &&
            form.password1 == form.password2;


        panel.fill({
            'disabled': valid ? '' : 'disabled',
        });
    });



});