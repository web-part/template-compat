/*
* babel time: 2020-10-19 16:42:32
*
* source md5: 40F23B27B94F386EE0F325269BC4CF44
*
* source file: htdocs/views/signup/Signup/Form/Agree.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

/**
* 
*/
KISP.panel('/Signup/Form/Agree', function (require, module, panel) {

    var meta = {
        agreed: false
    };

    panel.on('init', function () {

        panel.$on('click', {
            '[data-cmd="agree"]': function dataCmdAgree() {
                var agreed = meta.agreed = !meta.agreed;

                $(this).toggleClass('on', agreed);

                panel.fire('change', [agreed]);
            }

        });
    });

    panel.on('render', function (data) {
        var agreed = meta.agreed = data.agreed;

        panel.fill({
            'agreed': agreed ? 'on' : ''
        });
    });
});