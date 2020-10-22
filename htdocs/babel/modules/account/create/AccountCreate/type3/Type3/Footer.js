/*
* babel time: 2020-10-19 16:42:31
*
* source md5: 939B67C056A579A0C1B699C32D13B22A
*
* source file: htdocs/modules/account/create/AccountCreate/type3/Type3/Footer.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/AccountCreate/Type3/Footer', function (require, module, panel) {

    var step = 1;

    function setStatus(index) {
        step = index || step;
        var isFirst = step == 1;
        var isLast = step == 2;

        panel.$.find('[data-cmd="prev"]').toggleClass('hide', isFirst);
        panel.$.find('[data-cmd="next"]').toggleClass('hide', isLast);
        panel.$.find('[data-cmd="create"]').toggleClass('on', isLast);
    }

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="prev"]': function dataCmdPrev() {
                if (step == 1) {
                    return;
                }

                step--;
                setStatus();
                panel.fire('step', [step]);
            },

            '[data-cmd="next"]': function dataCmdNext() {
                if (step == 2) {
                    return;
                }

                var values = panel.fire('next', [step]);

                if (values.includes(false)) {
                    return;
                }

                step++;
                setStatus();
                panel.fire('step', [step]);
            },

            '[data-cmd="create"]': function dataCmdCreate() {
                panel.fire('create');
            }
        });
    });

    panel.on('render', function (stepValue) {
        step = stepValue || 1;
        setStatus();
        panel.fire('step', [step]);
    });

    return {
        setStatus: setStatus
    };
});