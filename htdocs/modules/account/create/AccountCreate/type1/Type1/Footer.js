

KISP.panel('/AccountCreate/Type1/Footer', function (require, module, panel) {

    var step = 1;


    function setStatus(index) {
        step = index || step;
        var isFirst = step == 1;
        var isLast = step == 3;

        panel.$.find('[data-cmd="prev"]').toggleClass('hide', isFirst);
        panel.$.find('[data-cmd="next"]').toggleClass('hide', isLast);
        panel.$.find('[data-cmd="create"]').toggleClass('on', isLast);
    }



    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="prev"]': function () {
                if (step == 1) {
                    return;
                }

                step--;
                setStatus();
                panel.fire('step', [step]);
            },

            '[data-cmd="next"]': function () {
                if (step == 3) {
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

            '[data-cmd="create"]': function () {
                panel.fire('create');
            },
        });
    });



    panel.on('render', function (stepValue) {
        step = stepValue || 1;
        setStatus();
        panel.fire('step', [step]);
    });

    return {
        setStatus: setStatus,
    }


});





