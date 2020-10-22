

KISP.panel('/Application/Forbidden/Content/Head', function (require, module, panel) {

    var User = require('User');
    var checked = false;

    panel.on('init', function () {

    });
    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="check"]': function () {
                checked = !checked;
                $(this).toggleClass('on', checked);
                panel.fire('check-all', [checked]);
            },

        });
    })




    panel.on('render', function (updateInfo) {

        // panel.fill({
        //     'items': list,
        // });

    });
    return {
        checkall: function (chosed) {
            checked = chosed;
            panel.$.find('[data-cmd="check"]').toggleClass('on', checked);
        }
    }
});






