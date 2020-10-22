
/**
* 重置密码。
*/
KISP.panel('/Reset/Step3', function (require, module, panel) {



    panel.on('init', function () {
        panel.$on('click', {
            '[data-cmd="login"]': function (event) {
                event.preventDefault();

                panel.$.removeClass('on');
                panel.fire('done', []);
            },
        });
    });



    /**
    * 
    */
    panel.on('render', function () {

        panel.$.addClass('on');


        panel.fire('render');

    });

    return {
        removeClass: function () {
            panel.$.removeClass('on');
        },
    };




});