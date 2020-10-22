
/*
* 
*/
KISP.panel('/Messages/Main', function (require, module, panel) {
    var API = module.require('API');
    var Detail = module.require('Detail');


    panel.on('init', function () {

        API.on('success', {
            'get': function (data, item) {
                Detail.render(data);

                panel.$.removeClass('empty');
                panel.fire('read', [item]);

            },
        });
    });



    panel.on('render', function (item) {

        panel.$.addClass('empty');

        if (item) {
            API.get(item);
        }

    });


    return {

    };

});



