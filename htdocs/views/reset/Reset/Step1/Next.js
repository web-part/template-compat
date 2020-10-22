
/**
* 
*/
KISP.panel('/Reset/Step1/Next', function (require, module, panel) {

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
            form.code;


        panel.fill({
            'disabled': valid ? '' : 'disabled',
        });
    });



});