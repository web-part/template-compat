


KISP.panel('/AccountRecover/Content/Tabs', function (require, module, panel) {

    var KISP = require('KISP');

    var tabs = null;
   
    panel.on('init', function () {

        tabs = KISP.create('Tabs', {
            container: panel.$.get(0),
            selector: '[data-index]',
            activedClass: 'on',
            eventName: 'click',
        });

        tabs.on('change', function (item, index) {
            panel.fire('change', [index]);
        });



    });



    panel.on('render', function (index) {
        
        tabs.render();
        tabs.active(index);

    });
    return {
        'reset': function () { 
            tabs.reset();
        },
    }

});