

KISP.panel('/Products/Add/Content/Types', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];
    var tabs = null;



    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>button:not(.forbid)',
            eventName: 'click',
            indexKey: 'data-index',
            activedClass: 'on',
        });

        tabs.on('change', function (item, index) {
            panel.fire('change', [item]);
        });

    });




    panel.on('render', function (items) {

        list = items;

        tabs.render(list, function (item, index) {
            return {
                'index': index,
                'name': item.name,
                'disabled': item.disabled ? 'forbid' : '',
                'title': item.title || '',
            };
        });

        tabs.active(0);

    });




    return {
        get: function () {
            return {};
        },
    };
   

});






