
/*
* 
*/
KISP.panel('/AccountBaks/Manual/Header', function (require, module, panel) {

    var API = module.require('API');
    var Bar = module.require('Bar');
    var THeader = module.require('THeader');




    panel.on('init', function () {
        THeader.on({
            'check': function (checked) {
                panel.fire('check', [checked])
            },

            'delete': function () {
                panel.fire('delete');
            },
        })

        API.on({
            'getpan': function (data) {
                Bar.render(data);
            },
        })
    });


    panel.on('render', function (meta, list, count) {
        THeader.render(list, count);
        API.get(meta);
    });



    return {

    };


});



