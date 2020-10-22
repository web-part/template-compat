

KISP.panel('/Products/Add/Content', function (require, module, panel) {

    var Types = module.require('Types');
    var Items = module.require('Items');
    var Regions = module.require('Regions');

    var meta = {
        type: null,
        item: null,
        region: null,
    };

    panel.on('init', function () {
        Types.on({
            'change': function (type) {
                var items = type.items;
                panel.$.toggleClass('no-items', items.length == 0);
                meta.type = type;

                Items.render(type.items);
                Regions.enable(type.regions);
            },
        });

        Items.on({
            'change': function (item) {
                meta.item = item;
            },
        });

        Regions.on({
            'change': function (item) {
                meta.region = item;
            },
        });

    });



    panel.on('render', function (data) {

        meta = {};

        //这个要在 Types.change 事件之前。
        Regions.render(data.regions);

        Types.render(data.types);

    });




    return {
        get: function () {
            return meta;
        },
    };


});






