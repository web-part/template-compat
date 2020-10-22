
/*
* 
*/
KISP.panel('CustomizePeriod/Content/Header', function (require, module, panel) {
    var KISP = require('KISP');
    var Years = module.require('Years');
    var Nature = module.require('Nature');
    var Segment = module.require('Segment');


    var meta = {
        'year': 0,
        'nature': true,
        'segment': 12,
    };


    panel.on('init', function () {

        //把短时间内的多次触发合并成一次进行触发。
        //同时会合并数据参数。
        var tid = null;

        function fire(opt) {
            clearTimeout(tid);
            Object.assign(meta, opt);

            tid = setTimeout(function () {
                panel.fire('change', [meta]);

            }, 200);
        }


        Years.on({
            'change': function (year) {
                fire({ 'year': year, });
            },
        });

        Nature.on({
            'change': function (checked) {
                Segment.render({
                    'disabled': checked,
                });

                fire({ 'nature': checked, });
            },
        });

        Segment.on({
            'change': function (segment) {
                fire({ 'segment': segment, });
            },
        });
    });




    /**
    * 渲染。
    *   data = {
    *       year: 2018,     //头部年份列表填充后，要选中的年份值。
    *       years: [],      //部年份列表要填充数据。
    *   };
    */
    panel.on('render', function (data) {
        Years.render(data);

        Nature.render({ 'checked': true, });
    });


    return {
        enable: function (enabled) {
            panel.$.find('[data-id="container"]').toggleClass('disabled', !enabled);
        },

        get: function () {
            return meta;
        },
    };
});





