﻿

KISP.panel('/Products/Add/Content/Regions', function (require, module, panel) {

    var KISP = require('KISP');
    var Tabs = KISP.require('Tabs');

    var list = [];



    panel.on('init', function () {
        panel.$.on('click', 'button[data-enabled="true"]', function () {
            var index = +this.getAttribute('data-index');
            var item = list[index];

            panel.$.find('button').removeClass('on');
            $(this).addClass('on');

            panel.fire('change', [item]);
        });

    });




    panel.on('render', function (items, enables) {
        var id$enabled = {};
        var beginIndex = -1; //填充后要自动选中的项，从首个启用项开始。

        list = items;
        enables = enables || items; //如果不指定，则默认为全部启用。

        enables.forEach(function (item) {
            id$enabled[item.id] = true;
        });


        panel.fill(list, function (item, index) {
            var enabled = id$enabled[item.id];

            if (enabled && beginIndex < 0) {
                beginIndex = index;
            }

            return {
                'index': index,
                'name': item.name,
                'enabled': enabled,
                'forbid-class': enabled ? '' : 'forbid',
            };
        });


        if (beginIndex >= 0) {
            panel.$.find('[data-index="' + beginIndex + '"]').click();
        }
        else {
            panel.fire('change', [null]);
        }

    });



    return {
        enable: function (items) {
            panel.render(list, items);
        },
    };
   

});






