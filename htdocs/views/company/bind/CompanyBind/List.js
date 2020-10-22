

KISP.panel('/CompanyBind/List', function (require, module, panel) {
    

    var list = [];
    var tabs = null;


    panel.on('init', function () {
        tabs = KISP.create('Tabs', {
            'container': panel.$,
            'selector': '>li',
            'activedClass': 'on',
        });


        tabs.template(function (item, index) {
            return {
                'index': index,
                'name': item['name'],
            };
        });


        tabs.on({
            'change': function (item, index) {
                panel.fire('change', [item]);
            },
        });
    });



    /**
    */
    panel.on('render', function (items) {
        list = items;


        tabs.render(list);


    });




});