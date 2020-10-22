/*
* babel time: 2020-10-19 16:41:38
*
* source md5: 176EAEEC16C256F1E0EC3212FD23BAAF
*
* source file: htdocs/views/master/product/list/Products/dialog/add/Add/Content.js
*/


//'use strict'; //取消 babel 自动生成的严格模式。

KISP.panel('/Products/Add/Content', function (require, module, panel) {

    var Types = module.require('Types');
    var Items = module.require('Items');
    var Regions = module.require('Regions');

    var meta = {
        type: null,
        item: null,
        region: null
    };

    panel.on('init', function () {
        Types.on({
            'change': function change(type) {
                var items = type.items;
                panel.$.toggleClass('no-items', items.length == 0);
                meta.type = type;

                Items.render(type.items);
                Regions.enable(type.regions);
            }
        });

        Items.on({
            'change': function change(item) {
                meta.item = item;
            }
        });

        Regions.on({
            'change': function change(item) {
                meta.region = item;
            }
        });
    });

    panel.on('render', function (data) {

        meta = {};

        //这个要在 Types.change 事件之前。
        Regions.render(data.regions);

        Types.render(data.types);
    });

    return {
        get: function get() {
            return meta;
        }
    };
});