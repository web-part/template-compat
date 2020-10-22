
/**
* 
*/
KISP.panel('/Signup/Form/Agree', function (require, module, panel) {

    var meta = {
        agreed: false,
    };

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="agree"]': function () {
                var agreed = meta.agreed = !meta.agreed;

                $(this).toggleClass('on', agreed);

                panel.fire('change', [agreed]);
            },

        });
    });




    panel.on('render', function (data) {
        var agreed = meta.agreed = data.agreed;

        panel.fill({
            'agreed': agreed ? 'on' : '',
        });
    });



});