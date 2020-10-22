

KISP.panel('/Products/Add/Content/Items', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];
    var tabs = null;



    panel.on('init', function () {
        tabs = new Tabs({
            container: panel.$.get(0),
            selector: '>button',
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
            };
        });

        //list 有可能为空数组。
        if (list.length > 0) {
            tabs.active(0);
        }
        else {
            panel.fire('change', [null]);
        }


    });



});






